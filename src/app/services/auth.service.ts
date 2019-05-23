import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, auth } from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserInfo } from './UserInfo';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  constructor(private afAuth: AngularFireAuth, route: ActivatedRoute , private userSrv: UserService) {
    this.user$ = afAuth.authState;
  }
  login() {
    // let returnUrl = route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logOut() {
    this.afAuth.auth.signOut();
  }
  get AppUser$(): Observable<UserInfo> {
    return this.user$.pipe(switchMap(user => {
      if (user) {
        return this.userSrv.getUser(user.uid).valueChanges();
      } else {
        return of(null);
      }
    }));
  }
}
