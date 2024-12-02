import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './index.component.html',
})
export default class IndexComponent {
  private platform = inject(PLATFORM_ID);

  images: string[] = [
    '/img/img2.jpg',
    '/img/img3.jpg',
    '/img/img4.jpg',
  ];
  
  currentImageIndex = signal(0);

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      setInterval(() => {
        this.currentImageIndex.update(v => {
          v = v + 1;
          return v === 3 ? 0 : v;
        });
      }, 3000);
    }
  }
  
}
