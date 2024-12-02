import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TAX } from '@app/app.constants';
import { AddProduct, RemoveProduct, ResetCart } from '@app/domains/cart/cart.actions';
import { CartStateToken } from '@app/domains/cart/cart.state';
import { Product } from '@app/domains/products/product.interface';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
  ],
  templateUrl: './cart.component.html',
})
export default class CartComponent {
  private store = inject(Store);

  cart = this.store.selectSignal(CartStateToken);

  TAX = TAX;

  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

  removeProduct(product: Product) {
    this.store.dispatch(new RemoveProduct(product));
  }
  
  resetCart() {
    this.store.dispatch(ResetCart);
  }

}
