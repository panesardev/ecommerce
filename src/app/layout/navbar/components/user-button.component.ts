import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-user-button',
  imports: [
    RouterLink,
  ],
  template: `
    @if (user(); as user) {
      <a routerLink="/profile" class="hidden lg:inline-flex btn hover:bg-base-300 btn-circle">
        <i class="text-lg fa-solid fa-user-astronaut"></i>
      </a>
      <label for="my-drawer-3" role="button" aria-label="close sidebar" routerLink="/profile" class="lg:hidden btn hover:base-300 btn-circle">
        <i class="text-lg fa-solid fa-user-astronaut"></i>
      </label>
    }
    @else {
      <a routerLink="/login" class="hidden lg:inline-flex btn hover:bg-base-300 btn-circle">
        <i class="text-lg fa-solid fa-user-astronaut"></i>
      </a>
      <label for="my-drawer-3" role="button" aria-label="close sidebar" routerLink="/login" class="lg:hidden btn hover:base-300 btn-circle">
        <i class="text-lg fa-solid fa-user-astronaut"></i>
      </label>
    }
  `,
})
export default class UserButtonComponent {
  private auth = inject(AuthService);

  user = toSignal(this.auth.user$);
}
