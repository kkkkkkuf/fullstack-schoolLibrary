import { NgModule } from '@angular/core';
import { AfterLoginPageComponent } from './after-login-page/after-login-page.component';
import { BookCatalogPageComponent } from './books/book-catalog-page/book-catalog-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarPageComponent } from './navbar-page/navbar-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { ViewBookPageComponent } from './books/view-book-page/view-book-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RecomendationPageComponent } from './recomendation-page/recomendation-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { ReadingNowPageComponent } from './reading-now-page/reading-now-page.component';
import { NavbarSecondPageComponent } from './navbar-second-page/navbar-second-page.component';
import { LibrarianNavbarPageComponent } from './Librarian/librarian-navbar-page/librarian-navbar-page.component';
import { LibrarianNavbarSecondPageComponent } from './Librarian/librarian-navbar-second-page/librarian-navbar-second-page.component';
import { BookAddPageComponent } from './Librarian/book-add-page/book-add-page.component';
import { RequestPageComponent } from './request-page/request-page.component';
import { IssuedBookPageComponent } from './issued-book-page/issued-book-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: '',
    component: NavbarPageComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'welcome', component: WelcomePageComponent }],
  },
  {
    path: '',
    component: NavbarSecondPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'after_login', component: AfterLoginPageComponent },
      { path: 'bookCatalog', component: BookCatalogPageComponent },
      { path: 'books/viewbook', component: ViewBookPageComponent },
      { path: 'recomendation', component: RecomendationPageComponent },
      { path: 'history', component: HistoryPageComponent },
      { path: 'readingNow', component: ReadingNowPageComponent },
    ],
  },
  {
    path: '',
    component: LibrarianNavbarPageComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'librarian/welcome', component: WelcomePageComponent }],
  },
  {
    path: '',
    component: LibrarianNavbarSecondPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'librarian/bookCatalog', component: BookCatalogPageComponent },
      { path: 'librarian/books/viewbook', component: ViewBookPageComponent },
      { path: 'librarian/addBook', component: BookAddPageComponent },
      { path: 'librarian/request', component: RequestPageComponent },
      { path: 'librarian/issuedBook', component: IssuedBookPageComponent },
      { path: 'librarian/allUsers', component: UsersPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
