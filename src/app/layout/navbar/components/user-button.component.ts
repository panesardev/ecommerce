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
      <a class="btn hover:bg-base-300 btn-circle" routerLink="/profile">
        <i class="text-lg fa-solid fa-user-astronaut"></i>
      </a>
    }
    @else {
      <a class="btn hover:bg-base-300 btn-circle" routerLink="/login">
        <i class="text-lg fa-solid fa-user-astronaut"></i>
      </a>
    }
  `,
})
export default class UserButtonComponent {
  private auth = inject(AuthService);

  user = toSignal(this.auth.user$);
}
