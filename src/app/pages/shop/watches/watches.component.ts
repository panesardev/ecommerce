import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductListComponent } from '@app/domains/products/components/product-list.component';
import { Category, PriceFilter } from '@app/domains/products/product.interface';
import { ProductService } from '@app/domains/products/product.service';
import { applyPriceFilter } from '@app/domains/products/product.utils';
import { BehaviorSubject, combineLatest, map, switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-watches',
  imports: [
    AsyncPipe,
    ProductListComponent,
  ],
  templateUrl: './watches.component.html',
})
export default class WatchesComponent {
  private productService = inject(ProductService);

  selectedCategory$ = new BehaviorSubject<Category>(null);
  selectedPriceFilter$ = new BehaviorSubject<PriceFilter>('DEFAULT');

  categories$ = this.productService.categories$.pipe(
    map(categories => categories.filter(category => category.slug.includes('watches'))),
  );

  products$ = combineLatest({
    products: this.categories$.pipe(
      map(categories => categories.map(category => this.productService.findByCategory(category))),
      switchMap(array => zip(array)),
      map(products2d => products2d.reduce((a, c) => [...a, ...c])),
    ), 
    category: this.selectedCategory$, 
    priceFilter: this.selectedPriceFilter$,
  }).pipe(
    map(({ products, category, priceFilter }) => {
      if (category) {
        products = products.filter(product => product.category === category.slug);
      }
      if (priceFilter) {
        products = applyPriceFilter(products, priceFilter);
      }
      return products;
    }),
  );

  setCategory(category: Category) {
    this.selectedCategory$.next(category);
  }
  
  setPriceFilter(priceFilter: PriceFilter) {
    this.selectedPriceFilter$.next(priceFilter);
  }

}
