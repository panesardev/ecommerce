import { Injectable, inject } from "@angular/core";
import { TAX } from "@app/app.constants";
import { StorageService } from "@app/shared/services/storage.service";
import { Action, NgxsOnInit, State, StateContext, StateToken } from "@ngxs/store";
import { AddProduct, ComputeCart, RemoveProduct, ResetCart, SaveCart } from "./cart.actions";
import { CartStateType } from "./cart.interface";

export const CartStateToken = new StateToken<CartStateType>('cart');

const initialState: CartStateType = {
  items: [],
  subtotal: 0.00,
  total: 0.00,
  quantity: 0,
}

@State({ 
  name: CartStateToken, 
  defaults: initialState, 
})
@Injectable()
export class CartState implements NgxsOnInit {
  private storage = inject(StorageService);

  ngxsOnInit(ctx: StateContext<CartStateType>) {
    const cart = this.storage.get('cart');
    if (cart) {
      ctx.setState({ ...cart });
    }
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<CartStateType>, action: AddProduct) {
    const state = ctx.getState();

    const exists = state.items.find(item => item.product.id === action.product.id);

    if (exists) {
      const index = state.items.indexOf(exists);
      state.items[index].quantity++;
      state.items[index].price = state.items[index].price + action.product.price;
    } 
    else {
      state.items.push({
        product: action.product,
        price: action.product.price,
        quantity: 1,
      });
    }
    
    ctx.setState(state);
    ctx.dispatch(ComputeCart);
  }

  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<CartStateType>, action: RemoveProduct) {
    const state = ctx.getState();

    const exists = state.items.find(item => item.product.id === action.product.id);

    if (exists) {
      const index = state.items.indexOf(exists);
      if (state.items[index].quantity > 0) {
        state.items[index].quantity--;
        state.items[index].price = state.items[index].price - action.product.price;
      }
      if (state.items[index].quantity == 0) {
        state.items.splice(index, 1);
      }
    }

    ctx.setState(state);
    ctx.dispatch(ComputeCart);
  }

  @Action(ComputeCart)
  computeCart(ctx: StateContext<CartStateType>) {
    const state = ctx.getState();
    
    if (state.items.length) {
      // compute cart.quantity
      state.quantity = state.items.map(i => i.quantity).reduce((a, c) => a + c);
      
      // compute cart.subtotal
      state.subtotal = state.items.map(i => i.price).reduce((a, c) => a + c);
      
      // compute cart.price
      state.total = state.subtotal + (state.subtotal * TAX);

      ctx.setState(state);
    }
    else {
      ctx.setState(initialState);
    }

    ctx.dispatch(SaveCart);
  }

  @Action(ResetCart)
  resetCart(ctx: StateContext<CartStateType>) {
    ctx.setState(initialState);
    ctx.dispatch(SaveCart);
  }

  @Action(SaveCart)
  saveCart(ctx: StateContext<CartStateType>) {
    this.storage.set('cart', ctx.getState());
  }
}
