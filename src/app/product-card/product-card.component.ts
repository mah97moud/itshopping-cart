import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('product') product: any = [];
  @Input('shoppingCart') shoppingCart: any = [];

  constructor(
    private cartServies: ShoppingCartService
  ) { }
  addToCart(product) {
    this.cartServies.addToCart(this.product);
  }
  removeFromCart(product) {
    this.cartServies.removeFromCart(this.product);
  }

  getQunatity() {
    
    if (!this.shoppingCart) {
      return 0;
    }
    const item = this.shoppingCart.items[this.product.key];
    console.log(item);
    return item ? item.quantity : 0;
  }

  ngOnInit() {
  }

}
