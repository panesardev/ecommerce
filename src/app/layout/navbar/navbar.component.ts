import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND } from '@app/app.constants';
import UserButtonComponent from './components/user-button.component';
import { Store } from '@ngxs/store';
import { CartStateToken } from '@app/domains/cart/cart.state';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    UserButtonComponent,
  ],
  templateUrl: './navbar.component.html',
})
export default class NavbarComponent {
  private store = inject(Store);

  cart = this.store.selectSignal(CartStateToken);

  BRAND = BRAND;
}
