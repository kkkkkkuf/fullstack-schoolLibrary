import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, take } from 'rxjs';
import { RequestPageComponent } from 'src/app/request-page/request-page.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookService } from 'src/app/shared/services/books.service';
import { IssuedBooksService } from 'src/app/shared/services/issued-books.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-librarian-navbar-page',
  templateUrl: './librarian-navbar-page.component.html',
  styleUrls: ['./librarian-navbar-page.component.css'],
})
export class LibrarianNavbarPageComponent implements OnInit {
  query!: string;
  books: any[] | undefined;
  book = {
    title: '',
    author: '',
    forWhatClass: '',
    genre: '',
  };

  quotes = [
    {
      text: '«Творчество заразительно. Передайте это».',
      author: 'Альберт Эйнштейн',
    },
    {
      text: 'Работа - это мощное средство самореализации.',
      author: 'Наполеон Хилл',
    },
    {
      text: 'Любите свою работу, и вы никогда не будете работать ни дня в своей жизни.',
      author: 'Конфуций',
    },
  ];

  quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];

  showNotification = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private bookService: BookService,
    private searchService: SearchService,
    public authService: AuthService,
    private issuedBookService: IssuedBooksService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = JSON.parse(JSON.stringify(data));
    });
    this.hasRequest().subscribe((result) => {
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
      this.router.navigate(['/librarian/bookCatalog'], {
        queryParams: { query: this.query, results: data.length },
      });
      console.log(data);
    });
  }

  onAfterLoginPage() {
    this.router.navigate(['/after_login']);
  }

  onRequestPage() {
    this.authService.showNotificationRequets = false;
    this.router.navigate(['/librarian/request']);
  }

  hasRequest(): Observable<boolean> {
    return this.issuedBookService.waitingForIssued().pipe(
      map((data) => {
        if (Array.isArray(data) && data.length > 0) {
          return true;
        } else {
          return false;
        }
      }),
      take(1)
    );
  }
}
