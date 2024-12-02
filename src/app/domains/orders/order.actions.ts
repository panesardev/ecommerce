import { AddressFormValue, PaymentFormValue, UserFormValue } from "./order.interface";

export class InitOrderState {
  static readonly type = '[ORDER] Init Order State';
}

export class PlaceOrder {
  static readonly type = '[ORDER] Place Order';
  constructor(public orderModal: HTMLDialogElement) {}
}

export class SetUser {
  static readonly type = '[ORDER] Set User';
  constructor(public user: UserFormValue) {}
}

export class SetAddress {
  static readonly type = '[ORDER] Set Address';
  constructor(public address: AddressFormValue) {}
}

export class SetPaymentMethod {
  static readonly type = '[ORDER] Set Payment Method';
  constructor(public paymentMethod: PaymentFormValue) {}
}
