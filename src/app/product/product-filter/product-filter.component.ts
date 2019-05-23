import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('Category') Category;
  constructor(private categorySer: CategoriesService) {
    this.categories$ = this.categorySer.getCategories();
  }
  ngOnInit() {
  }

}
