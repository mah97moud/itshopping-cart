import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;
  constructor(
    private catgSer: CategoriesService,
    private productSer: ProductsService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.categories$ = this.catgSer.getCategories();
    if (this.id) {
      this.productSer.getById(this.id).pipe(take(1))
      .subscribe(prod => {
        if (prod) {
          this.product = prod;
        }
        console.log(this.product);
      });
    }
  }

  save(product) {
    if (this.id) {
      this.productSer.updateProduct(this.id, product);
    } else {
      this.productSer.createProduct(product);
    }
    this.router.navigateByUrl('admin/products');
  }

  delete() {
    if (confirm('Are you Sure ?!!')) {
      this.productSer.deleteProduct(this.id);
    }
    this.router.navigateByUrl('admin/products');
  }
}
