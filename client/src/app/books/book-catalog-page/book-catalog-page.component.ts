import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { BookService } from '../../shared/services/books.service';
import { IssuedBooksService } from '../../shared/services/issued-books.service';

@Component({
  selector: 'app-book-catalog-page',
  templateUrl: './book-catalog-page.component.html',
  styleUrls: ['./book-catalog-page.component.css'],
})
export class BookCatalogPageComponent implements OnInit {
  books: any[] | undefined;
  book = {
    title: '',
    author: '',
    forWhatClass: '',
    genre: '',
    image: '',
    count: 0,
  };

  title: string = '';
  memberFIO: string = '';

  results: any[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private issuedBooksService: IssuedBooksService,
    private toastr: ToastrService,
    public authService: AuthService,
    private modalService: NgbModal,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        const queryObject = { query: params['query'] };
        this.searchService.search(queryObject).subscribe((data) => {
          this.books = JSON.parse(JSON.stringify(data));
        });
      } else {
        this.bookService.getBooks().subscribe((data) => {
          this.books = JSON.parse(JSON.stringify(data));
        });
      }
    });
  }

  viewBook(book: any) {
    console.log(book._id.toString());
    localStorage.setItem('BookId', book._id.toString());
    this.router.navigate(['books/viewbook']);
  }

  viewBookLibrarian(book: any) {
    console.log(book._id.toString());
    localStorage.setItem('BookId', book._id.toString());
    this.router.navigate(['librarian/books/viewbook']);
  }
  deleteBook(book: any) {
    this.bookService.deleteBook(book._id).subscribe((data: any) => {
      if (data.success) {
        this.ngOnInit();
        this.toastr.success(data.msg);
      } else {
        this.toastr.error(data.msg);
      }
    });
  }

  confirmDeleteBook(book: any) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Подтвердить действие';
    modalRef.componentInstance.message =
      'Вы уверены, что хотите выполнить это действие?';
    modalRef.result.then((result) => {
      if (result === 'ok') {
        // выполнить действие
        this.deleteBook(book);
      }
    });
  }
  takeBook(Books: any) {
    let books = {
      // bookId: localStorage.getItem('BookId'),
      bookId: Books._id,
      title: Books.title,
      author: Books.author,
      image: Books.image,
      memberFIO: localStorage.getItem('fio'),
      memberEmail: localStorage.getItem('email'),
    };
    //СДЕЛАТЬ ПРОВЕРКУ из списка  GET /api/issuedBooks/viewsubmittedbooks/12355@mail.ru
    // submittedBooksMember(email: any) вот этот метод по названию книги нельзя брать две одинаковых
    console.log(books);
    this.issuedBooksService.takeBook(books).subscribe((data) => {
      if (data.success) {
        // Books.count = Books.count - 1;

        // console.log(Books);
        // this.bookService.updateBook(books);

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
}
