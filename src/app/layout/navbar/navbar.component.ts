import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND } from '@app/app.constants';
import UserButtonComponent from './components/user-button.component';

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
  BRAND = BRAND;
}
