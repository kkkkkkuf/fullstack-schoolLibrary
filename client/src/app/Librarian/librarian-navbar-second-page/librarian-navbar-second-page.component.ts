import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IssuedBooksService } from 'src/app/shared/services/issued-books.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { UserServies } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-librarian-navbar-second-page',
  templateUrl: './librarian-navbar-second-page.component.html',
  styleUrls: ['./librarian-navbar-second-page.component.css'],
})
export class LibrarianNavbarSecondPageComponent implements OnInit {
  fio = localStorage.getItem('fio');
  users: any;
  query: string = '';

  showNotification = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserServies,
    private searchService: SearchService,
    private issuedBookService: IssuedBooksService
  ) {}

  ngOnInit(): void {
    this.currentUser();
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

  currentUser() {
    this.userService
      .getcurrentUser(localStorage.getItem('id'))
      .subscribe((data) => {
        this.users = JSON.parse(JSON.stringify(data));
      });
  }

  search() {
    this.searchService.search({ query: this.query }).subscribe((data) => {
      this.router.navigate(['/librarian/bookCatalog'], {
        queryParams: { query: this.query, results: data.length },
      });
      console.log(data);
    });
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

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'Доброе утро,';
    } else if (hour >= 12 && hour < 18) {
      return 'Добрый день,';
    } else if (hour >= 18 && hour < 24) {
      return 'Добрый вечер,';
    } else {
      return 'Доброй ночи,';
    }
  }
}
