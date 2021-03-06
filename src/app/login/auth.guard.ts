import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from './auth.service';

import {Observable} from 'rxjs/Observable';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  //@Override
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    console.log('AUTH USER AUTH USER');
    console.log(this.authService.userUid);
    console.log('AUTH USER AUTH USER');

    // console.log('IS ADMIN IS ADMIN IS ADMIN');
    // console.log(this.authService.isAdmin);
    // console.log('IS ADMIN IS ADMIN IS ADMIN');

    return this.authService.user.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['']);
        }
      }),
    );
  }
}
