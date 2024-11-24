import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { ProductService } from './domains/products/product.service';
import { firstValueFrom, map } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'view/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const productService = inject(ProductService);
      return await firstValueFrom(
        productService.products$.pipe(
          map(products => products.map(product => product.id)),
          map(ids => ids.map(id => ({ id: String(id) }))),
        ),
      );
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
