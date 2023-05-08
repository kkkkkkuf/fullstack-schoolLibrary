import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssuedBooksService } from '../shared/services/issued-books.service';

@Component({
  selector: 'app-reading-now-page',
  templateUrl: './reading-now-page.component.html',
  styleUrls: ['./reading-now-page.component.css'],
})
export class ReadingNowPageComponent implements OnInit {
  books: any[] | undefined;

  constructor(
    private router: Router,
    private issuedBookService: IssuedBooksService
  ) {}
  ngOnInit(): void {
    const email = localStorage.getItem('email');
    this.issuedBookService.issuedBooksMember(email).subscribe((data) => {
      this.books = JSON.parse(JSON.stringify(data));
      console.log(data);
    });
  }

  viewBook(book: any) {
    localStorage.setItem('BookId', book.bookId.toString());
    this.router.navigate(['books/viewbook']);
  }
}
