import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { AuthService } from '../shared/services/auth.service';
import { BookService } from '../shared/services/books.service';
import { IssuedBooksService } from '../shared/services/issued-books.service';
import { UserServies } from '../shared/services/user.service';

@Component({
  selector: 'app-recomendation-page',
  templateUrl: './recomendation-page.component.html',
  styleUrls: ['./recomendation-page.component.css'],
})
export class RecomendationPageComponent implements OnInit {
  books: any[] | undefined;
  book = {
    title: '',
    author: '',
    image: '',
    count: 0,
  };
  users: any;
  condition: boolean = true;

  title: string = '';
  memberFIO: string = '';
  memberClass: string = '';

  constructor(
    private bookService: BookService,
    private router: Router,
    private issuedBooksService: IssuedBooksService,
    private toastr: ToastrService,
    public authService: AuthService,
    private userService: UserServies,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.getInfoAboutUser();
  }

  viewBook(book: any) {
    localStorage.setItem('BookId', book._id.toString());
    console.log(book._id.toString());

    this.router.navigate(['books/viewbook']);
  }

  takeBook(Books: any) {
    let books = {
      title: Books.title,
      image: Books.image,
      memberFIO: localStorage.getItem('fio'),
      memberEmail: localStorage.getItem('email'),
    };
    this.issuedBooksService.takeBook(books).subscribe((data) => {
      if (data.success) {
        this.toastr.success(data.msg);
      } else {
        this.toastr.error(data.msg);
      }
    });
  }

  confirmTakeBook(book: any) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Подтвердить действие';
    modalRef.componentInstance.message =
      'Вы уверены, что хотите выполнить это действие?';
    modalRef.result.then((result) => {
      if (result === 'ok') {
        // выполнить действие
        this.takeBook(book);
      }
    });
  }

  getInfoAboutUser() {
    let memberId = localStorage.getItem('id');
    this.userService.getcurrentUser(memberId).subscribe((data) => {
      this.users = JSON.parse(JSON.stringify(data));
    });
    this.bookService.getBooks().subscribe((data) => {
      this.books = JSON.parse(JSON.stringify(data));
    });
  }

  parseInt(str: string): number {
    return parseInt(str);
  }
}
