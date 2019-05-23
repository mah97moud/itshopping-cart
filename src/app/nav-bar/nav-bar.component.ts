import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../services/UserInfo';
import { UserService } from '../services/user.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../services/IshoppingCart';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  appUser: UserInfo;
  constructor(public service: AuthService, private cartServ: ShoppingCartService ) {
    this.service.AppUser$.subscribe(newAppUser => this.appUser = newAppUser);
    console.log(this.appUser);
  }
  logOut() {
    this.service.logOut();
  }

  async ngOnInit() {
   this.cart$ = await this.cartServ.getCart();
  }
}
