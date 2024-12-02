import { Product } from "../products/product.interface";

export interface Order extends OrderStateType {
  id?: string;
}

export interface OrderStateType {
  user: UserFormValue;
  address: AddressFormValue;
  paymentMethod: PaymentFormValue;
  created: string;
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  total: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface UserFormValue {
  displayName: string;
  email: string;
}

export interface AddressFormValue {
  street: string;
  city: string;
  province: string;
  country: string;
  postal: string;
  instructions?: string;
}

export interface PaymentFormValue {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
