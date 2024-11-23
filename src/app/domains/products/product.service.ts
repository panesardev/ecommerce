import { HttpClient } from '@angular/common/http';
import { inject, Injectable, linkedSignal, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Category, Product } from './product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  // productsResource = rxResource({
  //   loader: () => this.http.get<Product[]>('/json/products.json'),
  // })  
  
  // categoriesResource = rxResource({
  //   loader: () => this.http.get<Category[]>('/json/categories.json'),
  // })
  
  // products = this.productsResource.value;

  // categories = this.categoriesResource.value;

  products = signal([]);
  categories = signal([]);

  // watches = linkedSignal(() => {
  //   const categories = this.categories().filter(c => c.slug.includes('watches'));
  //   const productSignals = categories.map(c => this.findByCategory(c));
  //   const products2d = productSignals.map(signal => signal());
  //   return products2d.reduce((a, c) => [...a, ...c]);
  // });

  // shoes = linkedSignal(() => {
  //   const categories = this.categories().filter(c => c.slug.includes('shoes'));
  //   const productSignals = categories.map(c => this.findByCategory(c));
  //   const products2d = productSignals.map(signal => signal());
  //   return products2d.reduce((a, c) => [...a, ...c]);
  // });

  findById(id: Product['id']): Signal<Product> {
    return linkedSignal(() => this.products().find(p => p.id === id));
  }
  
  findByCategory(category: Category): Signal<Product[]> {
    return linkedSignal(() => this.products().filter(p => p.category === category.slug));
  }
}
