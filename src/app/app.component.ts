import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FooterComponent from './layout/footer/footer.component';
import NavbarComponent from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    // NavbarComponent,
    // FooterComponent,
  ],
  template: `
    <!-- <div class="scroll-watcher"></div>
    <app-navbar>
      <main class="max-w-[1920px] mx-auto px-4 py-8 md:px-8 md:py-12">
        <router-outlet />
      </main>
      <app-footer />
    </app-navbar> -->
  `,
})
export class AppComponent {

}
