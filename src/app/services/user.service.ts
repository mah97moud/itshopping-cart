import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private dp: AngularFireDatabase
  ) { }
  save(user: firebase.User) {
    this.dp.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  getUser(uid: string) {
    return this.dp.object('/users/' + uid);
  }
}
