import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accept-privacy-policy',
  imports: [RouterLink],
  template: `
    @if (show()) {
      <div class="bg-base-200 fixed z-10 bottom-0 left-0 right-0 shadow-md p-6">
        <div class="grid lg:flex justify-between items-center gap-6 max-w-3xl mx-auto">
          <p>Please accept <a class="text-blue-500" routerLink="/privacy-policy">Privacy policy</a> in order to use this application</p>
          <button class="btn btn-primary w-44" (click)="accept()">Accept</button>
        </div>
      </div>
    }
  `,
})
export default class AcceptPrivacyPolicyComponent {
  private platform = inject(PLATFORM_ID);

  show = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      const show = sessionStorage.getItem('accepted');

      if (show == 'true') {
        this.show.set(false);
      }
      else {
        this.show.set(true);
      }
    }
  }

  accept() {
    sessionStorage.setItem('accepted', 'true');
    this.show.set(false);
  }

}
