import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual } from 'swiper';
import { BookService } from '../shared/services/books.service';
import { IssuedBooksService } from '../shared/services/issued-books.service';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-after-login-page',
  templateUrl: './after-login-page.component.html',
  styleUrls: ['./after-login-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AfterLoginPageComponent implements OnInit {
  slides$ = new BehaviorSubject<string[]>(['']);
  books: any | undefined;
  allBooks: any | undefined;

  constructor(
    private issuedBookService: IssuedBooksService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.slides$.next(
      Array.from({ length: 50 }).map((el, index) => `Slide ${index + 1}`)
    );
    const email = localStorage.getItem('email');
    this.issuedBookService.issuedBooksMember(email).subscribe((data) => {
      this.books = JSON.parse(JSON.stringify(data));
    });
    console.log(localStorage);
  }
}
