import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../services/IshoppingCart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  cart$: Observable<ShoppingCart>;
  constructor(private cartServ: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartServ.getCart();
    console.log(this.cart$);
  }

}
