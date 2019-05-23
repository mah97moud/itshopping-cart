import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { promise } from 'protractor';
import { ShoppingCart } from '../services/IshoppingCart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {


  product: any[];
  filteredProducts: any[] = [];
  Category: string;
  subscribtion: Subscription;
  cart$: Observable<ShoppingCart>;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartServ: ShoppingCartService) {

    this.subscribtion = this.productService.getAll().subscribe(
      product => {
        this.product = product;
        this.route.queryParamMap.subscribe(
          params => {
            this.Category = params.get('Category');
            this.filteredProducts = (this.Category) ? this.product.filter(p => p.payload.val().Category === this.Category) : this.product;
          }
        )
      }
    )

    // this.subscribtion =
    //   this.productService.getAll().pipe(
    //     switchMap(
    //       products => {
    //         this.product = products;
    //         return this.route.queryParamMap;
    //       }
    //     )
    //   ).pipe().subscribe(
    //     params => {
    //       this.Category =
    //         params.get('Category');
    //       // Read value of query string
    //       this.filteredProducts =
    //         (this.Category) ?
    //           this.product.filter(
    //             product => {
    //               product.payload.val().Category === this.Category;
    //               // console.log(product.payload.val().Category);
    //               console.log(this.Category);
    //               console.log(this.route.queryParamMap);
    //             }
    //           ) : this.product;
    //     }
    //   );
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartServ.getCart();
    console.log(this.cart$);
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

}
