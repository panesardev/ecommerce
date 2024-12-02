import { inject, Injectable } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { filter, firstValueFrom, map, startWith } from 'rxjs';
import { Order } from './order.interface';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private auth = inject(AuthService);

  orders$ = this.auth.user$.pipe(
    filter(user => user !== null),
    map(user => user.orders),
    startWith([] as Order[]),
  );

  async create(order: Order): Promise<void> {
    const user = await firstValueFrom(this.auth.user$);

    order.id = crypto.randomUUID();
    user.orders = [...user.orders, order];

    await this.auth.setUserDoc(user.uid, {
      orders: user.orders,
      products: user.products,
    });
  }

  async delete(id: Order['id']): Promise<void> {
    const user = await firstValueFrom(this.auth.user$);

    user.orders = user.orders.filter(o => o.id !== id);

    await this.auth.setUserDoc(user.uid, {
      orders: user.orders,
      products: user.products,
    });
  }

}
