import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }
  createProduct = product => this.db.list('/product').push(product);

  getAll = () => this.db.list('/product').snapshotChanges();

  getById = (productId: string) => this.db.object('/product/' + productId).valueChanges();

  updateProduct = (productId: string , product) => this.db.object('/product/' + productId).update(product);

  deleteProduct = (productId: string ) => this.db.object('/product/' + productId).remove();
}
