import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/services/books.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBookModalPageComponent } from 'src/app/edit-book-modal-page/edit-book-modal-page.component';
import { Book } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-view-book-page',
  templateUrl: './view-book-page.component.html',
  styleUrls: ['./view-book-page.component.css'],
})
export class ViewBookPageComponent implements OnInit {
  Books = {
    title: '',
    author: '',
    about: '',
    genre: '',
    count: 0,
    image: '',
    forWhatClass: '',
  };

  memberName: string = '';
  // Объявляем переменную, в которой будут храниться измененные данные
  book: any;

  constructor(
    private bookService: BookService,
    public authService: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    let BookId = localStorage.getItem('BookId');
    this.bookService.getBook(BookId).subscribe((data) => {
      this.Books = JSON.parse(JSON.stringify(data));
      console.log(BookId);
    });
  }

  editBook() {
    const modalRef = this.modalService.open(EditBookModalPageComponent);
    modalRef.componentInstance.book = this.Books;
    modalRef.result
      .then((result: Book) => {
        if (result) {
          let BookId: string | null = localStorage.getItem('BookId');
          if (BookId !== null) {
            this.bookService.updateBook(BookId, result).subscribe(
              (data: any) => {
                // console.log(data);
                // this.ngOnInit();
                if (data.success) {
                  this.ngOnInit();
                  this.toastr.success(data.msg);
                } else {
                  this.toastr.error(data.msg);
                }
              }
              // (error) => {
              //   console.log(error);
              // }
            );
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
