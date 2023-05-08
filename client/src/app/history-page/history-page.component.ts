import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { IssuedBooksService } from '../shared/services/issued-books.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  books: any[] | undefined;
  book = {
    bookId: '',
  };
  constructor(
    private router: Router,
    private issuedBooksService: IssuedBooksService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    const email = localStorage.getItem('email');
    this.issuedBooksService.submittedBooksMember(email).subscribe((data) => {
      this.books = JSON.parse(JSON.stringify(data));
      console.log((this.books = JSON.parse(JSON.stringify(data))));
    });
  }

  viewBook(book: any) {
    localStorage.setItem('BookId', book.bookId.toString());
    this.router.navigate(['books/viewbook']);
  }
}
