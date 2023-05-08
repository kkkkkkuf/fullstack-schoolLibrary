import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';
import { SearchService } from '../shared/services/search.service';
import { UserServies } from '../shared/services/user.service';
import { IssuedBooksService } from '../shared/services/issued-books.service';
import { RequestPageComponent } from '../request-page/request-page.component';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-navbar-second-page',
  templateUrl: './navbar-second-page.component.html',
  styleUrls: ['./navbar-second-page.component.css'],
})
export class NavbarSecondPageComponent implements OnInit {
  fio = localStorage.getItem('fio');
  users: any;
  books: any[] | undefined;
  book = {
    title: '',
    author: '',
    forWhatClass: '',
    genre: '',
  };
  query: string = '';

  booksOnHand: any;
  isOpen = false;
  @Output() notifyBooksOnHand: EventEmitter<any> = new EventEmitter();
  showNotification = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserServies,
    private searchService: SearchService,
    private notificationService: IssuedBooksService
  ) {}

  ngOnInit(): void {
    this.currentUser();
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

  currentUser() {
    this.userService
      .getcurrentUser(localStorage.getItem('id'))
      .subscribe((data) => {
        this.users = JSON.parse(JSON.stringify(data));
      });
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
    const userId = localStorage.getItem('id')!;
    const email = localStorage.getItem('email')!;
    const data = { memberEmail: email };
    if (userId) {
      this.notificationService
        .getBooksOnHand(userId, data)
        .subscribe((data) => {
          this.booksOnHand = data;
          this.notifyBooksOnHand.emit(this.booksOnHand); // Отправить booksOnHand в NotificationComponent
          this.isOpen = !this.isOpen;
        });
    }
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
