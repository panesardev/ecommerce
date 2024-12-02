import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { AddressFormValue, Order } from '@app/domains/orders/order.interface';
import { OrderService } from '@app/domains/orders/order.service';

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink,
  ],
  templateUrl: './profile.component.html',
})
export default class ProfileComponent {
  private auth = inject(AuthService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  logoutModal = viewChild.required<ElementRef<HTMLDialogElement>>('logoutModal');

  user = toSignal(this.auth.user$);
  orders = toSignal(this.orderService.orders$);

  async deleteOrder(id: Order['id']): Promise<void> {
    await this.orderService.delete(id);
  }

  async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl('/');
  }

  formatAddress(address: AddressFormValue) {
    return `${address.street} ${address.city} ${address.province} ${address.postal}`;
  }

  openLogoutModal() {
    this.logoutModal().nativeElement.show();
  }

  closeLogoutModal() {
    this.logoutModal().nativeElement.close();
  }
}
