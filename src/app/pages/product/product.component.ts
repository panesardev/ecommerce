import { Component, inject, input, linkedSignal } from '@angular/core';
import { AddProduct } from '@app/domains/cart/cart.actions';
import { Product } from '@app/domains/products/product.interface';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export default class ProductComponent {
  private store = inject(Store);

  product = input.required<Product>();

  productImage = linkedSignal(() => this.product().images[0]);

  getDate(date: string) {
    return new Date(date).toDateString();
  }

  addToCart(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }
}
