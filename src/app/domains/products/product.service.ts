import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category, Product } from './product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  products$ = this.http.get<Product[]>('/json/products.json');
  categories$ = this.http.get<Category[]>('/json/categories.json');

  findById(id: Product['id']): Observable<Product> {
    return this.products$.pipe(
      map(products => products.find(p => p.id === id)),
    );
  }
  
  findByCategory(category: Category): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.category === category.slug)),
    );
  }

  getCategoryName(slug: string): Observable<string> {
    return this.categories$.pipe( 
      map(categories => categories.find(c => c.slug === slug)),
      map(category => category.name),
    );
  }
}
