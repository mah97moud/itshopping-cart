import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(state: RouterStateSnapshot) {
    return this.authService.user$.pipe(map(
      user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login'] , { queryParams : { returnUrl : state.url}});
          return false;
        }
      }
    ));
  }
}
