import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';
import { BookService } from '../shared/services/books.service';
import { SearchService } from '../shared/services/search.service';
import { IssuedBooksService } from '../shared/services/issued-books.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-navbar-page',
  templateUrl: './navbar-page.component.html',
  styleUrls: ['./navbar-page.component.css'],
})
export class NavbarPageComponent implements OnInit {
  query!: string;
  books: any[] | undefined;
  book = {
    title: '',
    author: '',
    forWhatClass: '',
    genre: '',
  };
  facts = [
    {
      fact: 'Интересный факт:',
      description:
        'Всего 6 минут чтения более чем на две трети снижает уровень стресса.',
    },
    {
      fact: 'Цитата:',
      description: '«Книга — лучший подарок», — Шерлин Пейн.',
    },
    {
      fact: 'Интересный факт:',
      description:
        'В США существует библиотека для глухих, где все книги написаны на языке жестов.',
    },
  ];
  randomFact = this.facts[Math.floor(Math.random() * this.facts.length)];

  booksOnHand: any;
  isOpen = false;
  showNotification = false;
  @Output() notifyBooksOnHand: EventEmitter<any> = new EventEmitter();

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private searchService: SearchService,
    private bookService: BookService,
    private notificationService: IssuedBooksService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = JSON.parse(JSON.stringify(data));
    });
    this.toSeeNotification().subscribe((result) => {
      this.showNotification = result;
    });
  }

  onLogoutClick() {
    this.authService.logout();

    this.toastr.warning('Вы вышли из системы');
    this.router.navigate(['/login']);
    return false;
  }

  search() {
    this.searchService.search({ query: this.query }).subscribe((data) => {
      this.router.navigate(['/bookCatalog'], {
        queryParams: { query: this.query, results: data.length },
      });
      console.log(data);
    });
  }

  openNotification() {
    this.authService.showNotificationBadge = false;
    const userId = localStorage.getItem('id');
    const email = localStorage.getItem('email')!;
    const data = { memberEmail: email };
    if (userId) {
      this.notificationService
        .getBooksOnHand(userId, data)
        .subscribe((data) => {
          this.booksOnHand = data;
          console.log(data);

          console.log(this.showNotification);
          this.notifyBooksOnHand.emit(this.booksOnHand); // Отправить booksOnHand в NotificationComponent
          this.isOpen = !this.isOpen;
        });
    }
  }

  toSeeNotification(): Observable<boolean> {
    const userId = localStorage.getItem('id')!;
    const email = localStorage.getItem('email')!;
    const data = { memberEmail: email };
    return this.notificationService.getBooksOnHand(userId, data).pipe(
      map((booksOnHand: any[]) => {
        if (booksOnHand) {
          for (const book of booksOnHand) {
            const dueDate = new Date(book.dueDate);
            const today = new Date();
            const timeDiff = dueDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (daysDiff <= 5) {
              return true;
            }
          }
        }
        return false;
      })
    );
  }
}
