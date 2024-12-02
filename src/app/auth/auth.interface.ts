import { User as FirebaseUser } from '@angular/fire/auth';
import { Order } from '@app/domains/orders/order.interface';
import { Product } from '@app/domains/products/product.interface';

export interface User extends FirebaseUser, UserData {}

export interface UserData {
  products: Product['id'][];
  orders: Order[];
}

export type AuthProviderName = 'google' | 'github';

export interface Credentials {
  email?: string;
  password?: string;
  displayName?: string;
}
