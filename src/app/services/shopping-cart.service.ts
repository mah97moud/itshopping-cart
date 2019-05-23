import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './IshoppingCart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreate: new Date().getTime()
    });
  }

  public async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).valueChanges().pipe(
      map(
        cart => new ShoppingCart((cart as any).items)
      )
    );
  }
  
  private async getOrCreateCartId() {

    const cartId = localStorage.getItem('cartId');
    console.log(cartId);
    if (cartId) { return cartId; }

    const result = await this.create();
    // console.log(result.key);
    localStorage.setItem('cartId', result.key);
    // console.log(localStorage.setItem('cartId', result.key));
    return result.key;
  }

  getItem(cartId: string, productId: string) {
    // console.log(this.db.object('shopping-cart/' + cartId + 'items/' + productId));
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }

  // عشان معملش condations  كتير بستخدم async

  async addToCart(product) {
    this.updateToCart(product, 1);
  }

  async removeFromCart(product) {
    this.updateToCart(product, -1);
  }

  async updateToCart(product, quantityState) {

    const cartId = await this.getOrCreateCartId();
    const cartKy = product.key;
    const item$ = this.getItem(cartId, cartKy);
    // console.log(cartId);
    // console.log(product.key);


    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      // console.log(item.payload.exists());
      if (item.payload.exists()) {
        item$.update({ quantity: item.payload.val().quantity + quantityState });
      } else {
        // console.log(product.payload.val().title);
        // console.log(product.payload.val().price);
        // console.log(product.payload.val().Category);
        // console.log(product.payload.val().ImageUrl);
        item$.update({
          product: {
            title: product.payload.val().title,
            price: product.payload.val().price,
            Category: product.payload.val().Category,
            ImageUrl: product.payload.val().ImageUrl,
          }, quantity: 1
        });
      }
    });
  }
}
