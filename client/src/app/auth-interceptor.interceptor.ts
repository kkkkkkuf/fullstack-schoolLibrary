import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // обработка ошибки 401 (Unauthorized)
          this.router.navigate(['/login']);
          this.toastr.info(
            'Ваша сессия истекла, пожалуйста, авторизуйтесь заново'
          );
        }
        return throwError(() => error);
      })
    );
  }
}
