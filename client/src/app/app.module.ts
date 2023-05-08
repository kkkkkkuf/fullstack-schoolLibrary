import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ToastrModule } from 'ngx-toastr';
import { SwiperModule } from 'swiper/angular';
import { AuthService } from './shared/services/auth.service';
import { NavbarPageComponent } from './navbar-page/navbar-page.component';
import { UserServies } from './shared/services/user.service';
import { AfterLoginPageComponent } from './after-login-page/after-login-page.component';
import { BookCatalogPageComponent } from './books/book-catalog-page/book-catalog-page.component';
import { BookService } from './shared/services/books.service';
import { ViewBookPageComponent } from './books/view-book-page/view-book-page.component';
import { IssuedBooksService } from './shared/services/issued-books.service';
import { RecomendationPageComponent } from './recomendation-page/recomendation-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { ReadingNowPageComponent } from './reading-now-page/reading-now-page.component';
import { NavbarSecondPageComponent } from './navbar-second-page/navbar-second-page.component';
import { LibrarianNavbarPageComponent } from './Librarian/librarian-navbar-page/librarian-navbar-page.component';
import { LibrarianNavbarSecondPageComponent } from './Librarian/librarian-navbar-second-page/librarian-navbar-second-page.component';
import { BookAddPageComponent } from './Librarian/book-add-page/book-add-page.component';
import { RequestPageComponent } from './request-page/request-page.component';
import { IssuedialogPageComponent } from './dialogs/issuedialog-page/issuedialog-page.component';
import { IssuedBookPageComponent } from './issued-book-page/issued-book-page.component';
import { ReturndialogPageComponent } from './dialogs/returndialog-page/returndialog-page.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { EditUserModalPageComponent } from './edit-user-modal-page/edit-user-modal-page.component';
import { EditBookModalPageComponent } from './edit-book-modal-page/edit-book-modal-page.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    WelcomePageComponent,
    RegisterPageComponent,
    NavbarPageComponent,
    AfterLoginPageComponent,
    BookCatalogPageComponent,
    ViewBookPageComponent,
    RecomendationPageComponent,
    HistoryPageComponent,
    ReadingNowPageComponent,
    NavbarSecondPageComponent,
    LibrarianNavbarPageComponent,
    LibrarianNavbarSecondPageComponent,
    BookAddPageComponent,
    RequestPageComponent,
    IssuedialogPageComponent,
    IssuedBookPageComponent,
    ReturndialogPageComponent,
    ConfirmModalComponent,
    UsersPageComponent,
    EditUserModalPageComponent,
    EditBookModalPageComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SwiperModule,
    // CarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      timeOut: 2000,
      closeButton: true,
    }),
    MatDialogModule,
  ],

  providers: [
    AuthService,
    UserServies,
    BookService,
    IssuedBooksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
