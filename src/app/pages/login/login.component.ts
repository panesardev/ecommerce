import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@app/auth/auth.service';
import { LoginFormState, LoginFormType } from './login.interface';
import { initialLoginFormState } from './login.utils';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private auth = inject(AuthService);

  user = toSignal(this.auth.user$);

  state = signal<LoginFormState>(initialLoginFormState());
  error = signal<string>(null);
  
  isLoginForm = computed(() => this.state().type === 'LOGIN');
  isSignUpForm = computed(() => this.state().type === 'SIGN_UP');
  isResetPasswordForm = computed(() => this.state().type === 'RESET_PASSWORD');
  
  heading = computed(() => {
    switch(this.state().type) {
      case 'LOGIN': return 'Login';
      case 'SIGN_UP': return 'Create new account';
      case 'RESET_PASSWORD': return 'Reset password';
    }
  });

  async submit(): Promise<void> {
    try {
      switch (this.state().type) {
        case 'LOGIN': 
          await this.auth.login(this.state().credentials);
          break;
        case 'SIGN_UP': 
          await this.auth.createAccount(this.state().credentials);
          break;
        case 'RESET_PASSWORD': 
          await this.auth.resetPassword(this.state().credentials);
          break;
      }
    } catch (e) {
      this.error.set(e.message);
    }
  }
  
  async googleLogin(): Promise<void> {
    try {
      await this.auth.oAuthLogin('google');
    } catch (e) {
      this.error.set(e.message);
    }
  }

  setFormType(type: LoginFormType): void {
    this.state.update(value => ({ ...value, type }));
  }
}