import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Product } from "@app/domains/products/product.interface";
import { ProductService } from "@app/domains/products/product.service";
import { map } from "rxjs";

export const productTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id');
  
  return productService.findById(+id).pipe(
    map(product => product.title),
  );
}

export const productResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id');

  return productService.findById(+id);
}
