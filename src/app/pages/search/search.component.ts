import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from '@app/domains/products/components/product-list.component';
import { ProductService } from '@app/domains/products/product.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    ProductListComponent,
  ],
  templateUrl: './search.component.html',
})
export default class SearchComponent {
  private productService = inject(ProductService);

  text = new FormControl('');

  products$ = this.text.valueChanges.pipe(
    map(text => text.toLowerCase()),
    switchMap(text => {
      return this.productService.products$.pipe(
        map(products => products.filter(product => {
          if (text) {
            const searchIn = [
              product.title,
              product.description,
              product.category,
              ...product.tags,
            ];
            return searchIn.some(v => v.toLowerCase().includes(text));
          }
          return false;
        })),
      );
    }),
  );

}
