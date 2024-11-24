import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FooterComponent from './layout/footer/footer.component';
import NavbarComponent from './layout/navbar/navbar.component';
import AcceptPrivacyPolicyComponent from './layout/components/accept-privacy-policy.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AcceptPrivacyPolicyComponent,
  ],
  template: `
    <div class="scroll-watcher"></div>
    <app-navbar>
      <main class="px-4 pt-8 pb-20 md:px-8">
        <router-outlet />
      </main>
      <app-footer />
    </app-navbar>
    <app-accept-privacy-policy />
  `,
})
export class AppComponent {

}
