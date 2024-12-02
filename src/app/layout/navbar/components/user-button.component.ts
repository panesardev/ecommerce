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
      <label for="my-drawer-3" role="button" aria-label="close sidebar" routerLink="/profile" class="btn hover:base-300 btn-circle">
        <i class="text-lg fa-solid fa-user-astronaut"></i>
      </label>
    }
    @else {
      <label for="my-drawer-3" role="button" aria-label="close sidebar" routerLink="/login" class="btn hover:base-300 btn-circle">
        <i class="text-lg fa-solid fa-user-astronaut"></i>
      </label>
    }
  `,
})
export default class UserButtonComponent {
  private auth = inject(AuthService);

  user = toSignal(this.auth.user$);
}
