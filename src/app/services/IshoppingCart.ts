import { IShoppingCartItem } from './IShoppingCartItems';

export class ShoppingCart {

    constructor(private items: IShoppingCartItem[]) {

    }
    get getTotalCount() {
        let counter = 0;

        for (const ProductId in this.items) {
            if (this.items.hasOwnProperty(ProductId)) {
                counter += this.items[ProductId].quantity;
            }
        }
        return counter;
    }
    get getTotalItemsPrice() {
        let total = 0;

        for (const ProductId in this.items) {
            if (this.items.hasOwnProperty(ProductId)) {
              let  price = this.items[ProductId].product.price as number;
              total += price;
            }
        }
        return total;
    }

    get productIDs() {
        console.log(Object.keys(this.items))
        return Object.keys(this.items);
    }
}