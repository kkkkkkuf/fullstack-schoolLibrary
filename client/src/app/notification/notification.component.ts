import { Component, Input } from '@angular/core';
import { IssuedBooksService } from '../shared/services/issued-books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  _booksOnHand!: any[];

  constructor(
    private issuedBookService: IssuedBooksService,
    private toastr: ToastrService
  ) {}

  @Input() set booksOnHand(value: any[]) {
    if (value) {
      this._booksOnHand = value.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA.getTime() - dateB.getTime();
      });
    }
  }

  @Input() isOpen!: boolean;

  closeNotification() {
    this.isOpen = false;
  }

  openNotification() {
    this.isOpen = true;
  }

  hasDueDateCloseToToday(): boolean {
    const today = new Date();
    const fiveDays = 5 * 24 * 60 * 60 * 1000; // 5 дней в миллисекундах
    for (const book of this._booksOnHand) {
      const dueDate = new Date(book.dueDate);
      if (Math.abs(dueDate.getTime() - today.getTime()) <= fiveDays) {
        return true;
      }
    }
    return false;
  }

  isDueSoon(book: any): boolean {
    const today = new Date();
    const fiveDays = 5 * 24 * 60 * 60 * 1000; // 5 дней в миллисекундах
    const dueDate = new Date(book.dueDate);
    return Math.abs(dueDate.getTime() - today.getTime()) <= fiveDays;
  }

  extendBook(bookId: string) {
    this.issuedBookService.extendBook(bookId).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success(data.msg);
          this.refreshBooks();
        } else {
          this.toastr.error(data.msg);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.msg);
      },
    });
  }

  refreshBooks() {
    const userId = localStorage.getItem('id')!;
    const email = localStorage.getItem('email')!;
    const data = { memberEmail: email };
    this.issuedBookService.getBooksOnHand(userId, data).subscribe(
      (data) => {
        this.booksOnHand = data;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
