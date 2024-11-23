import { User as FirebaseUser } from '@angular/fire/auth';
import { Product } from '@app/domains/products/product.interface';

export interface User extends FirebaseUser, UserData {}

export interface UserData {
  products: Product['id'][];
  // addresses: Address[];
  // payments: Payment[];
  // orders: Order[];
}

export type AuthProviderName = 'google' | 'github';

export interface Credentials {
  email?: string;
  password?: string;
  displayName?: string;
}
