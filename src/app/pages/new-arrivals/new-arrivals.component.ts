import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductListComponent } from '@app/domains/products/components/product-list.component';
import { Category, PriceFilter } from '@app/domains/products/product.interface';
import { ProductService } from '@app/domains/products/product.service';
import { applyPriceFilter } from '@app/domains/products/product.utils';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-new-arrivals',
  imports: [
    AsyncPipe,
    ProductListComponent,
  ],
  templateUrl: './new-arrivals.component.html',
})
export default class NewArrivalsComponent {
  private productService = inject(ProductService);

  selectedCategory$ = new BehaviorSubject<Category>(null);
  selectedPriceFilter$ = new BehaviorSubject<PriceFilter>('DEFAULT');

  categories$ = this.productService.categories$.pipe(
    map(categories => categories.filter(category => !category.slug.startsWith('mens'))), // remove mens shirts shoes watches 
    map(categories => categories.filter(category => !category.slug.startsWith('womens'))), // remove womens bags dresses jewellery shoes watches
    map(categories => [
      { slug: 'mens', name: 'Mens' },
      { slug: 'womens', name: 'Womens' },
      ...categories,
    ]), // add mens and womens
  );

  products$ = combineLatest({
    products: this.productService.products$, 
    category: this.selectedCategory$, 
    priceFilter: this.selectedPriceFilter$,
  }).pipe(
    map(({ products, category, priceFilter }) => {
      if (category) {
        if (category.slug.startsWith('mens') || category.slug.startsWith('womens')) {
          products = products.filter(product => product.category.startsWith(category.slug));
        } else {
          products = products.filter(product => product.category === category.slug);
        }
      }
      if (priceFilter) {
        products = applyPriceFilter(products, priceFilter);
      }
      return products;
    }),
  );

  setCategory(category: Category): void {
    this.selectedCategory$.next(category);
  }
  
  setPriceFilter(priceFilter: PriceFilter): void {
    this.selectedPriceFilter$.next(priceFilter);
  }
  
}
