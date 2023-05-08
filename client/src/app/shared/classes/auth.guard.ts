//так мы защищаем определенную роуты
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> {
  //   if (this.auth.isAuthenticated()) {
  //     return of(true);
  //   } else {
  //     this.router.navigate(['/login'], {
  //       queryParams: {
  //         accessDenied: true,
  //       },
  //     });
  //     return of(false);
  //   }
  // }
  canActivate(
    //   route: ActivatedRouteSnapshot,
    //   state: RouterStateSnapshot
    // ):
    //   | Observable<boolean | UrlTree>
    //   | Promise<boolean | UrlTree>
    //   | boolean
    //   | UrlTree {
    //   if (this.auth.loggedIn()) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    // }
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var isAuthenticated = this.auth.loggedIn();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }
}

// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (!this.authService.isAuthenticated()) {
//       this.router.navigate(['/login']);
//     }
//     return true;
//   }
// }
