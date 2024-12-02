import { inject, Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext, StateToken, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { CartStateToken } from "../cart/cart.state";
import { InitOrderState, PlaceOrder, SetAddress, SetPaymentMethod, SetUser } from "./order.actions";
import { OrderStateType } from "./order.interface";
import { OrderService } from "./order.service";
import { ResetCart } from "../cart/cart.actions";

export const OrderStateToken = new StateToken<OrderStateType>('order');

const initialState: OrderStateType = {
  user: null,
  address: null,
  created: null,
  items: [],
  paymentMethod: null,
  subtotal: 0.00,
  taxes: 0.00,
  total: 0.00,
}

@State({ 
  name: OrderStateToken, 
  defaults: initialState,
})
@Injectable()
export class OrderState implements NgxsOnInit {
  private store = inject(Store);
  private orderService = inject(OrderService);

  cart$ = this.store.select(CartStateToken);

  ngxsOnInit(ctx: StateContext<OrderStateType>): void {
    ctx.dispatch(InitOrderState);
  }

  @Action(InitOrderState)
  initOrderState(ctx: StateContext<OrderStateType>) {
    return this.cart$.pipe(
      tap(cart => ctx.patchState({
        items: cart.items.map(i => ({ 
          product: i.product,
          price: Number(i.price.toFixed(2)),
          quantity: i.quantity,
        })),
        subtotal: Number(cart.subtotal.toFixed(2)),
        total: Number(cart.total.toFixed(2)),
        taxes: Number((cart.total - cart.subtotal).toFixed(2)),
      })),
    );
  }

  @Action(PlaceOrder)
  async placeOrder(ctx: StateContext<OrderStateType>, action: PlaceOrder) {
    const state = ctx.getState();

    state.created = new Date().toDateString();
    await this.orderService.create(state);
    action.orderModal.showModal();

    ctx.dispatch(ResetCart);
  }

  @Action(SetUser)
  setUser(ctx: StateContext<OrderStateType>, action: SetUser) {
    ctx.patchState({ user: action.user });
  }
  
  @Action(SetAddress)
  setAddress(ctx: StateContext<OrderStateType>, action: SetAddress) {
    ctx.patchState({ address: action.address });
  }
  
  @Action(SetPaymentMethod)
  setPaymentMethod(ctx: StateContext<OrderStateType>, action: SetPaymentMethod) {
    ctx.patchState({ paymentMethod: action.paymentMethod });
  }

}
