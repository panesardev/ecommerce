import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageErrorDirective } from '@app/shared/directives/image-error.directive';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  imports: [
    RouterLink,
    NgOptimizedImage,
    ImageErrorDirective,
  ],
  template: `
    <div class="grid grid-cols-2 xl:grid-cols-3 gap-2 md:gap-8">
      @for (product of products(); track product.id) {
        <div class="bg-base-200 relative grid gap-4 md:gap-6 h-fit p-4 md:p-6">
          <div class="bg-base-300 absolute top-0 right-0 px-4 py-2">
            <span>$ {{ product.price }}</span>
          </div>
          <div routerLink="/view/{{ product.id }}" class="cursor-pointer">
            <img [ngSrc]="product.images[0]" [alt]="product.title" width="400" height="400" error="https://dummyjson.com/image/400x400?type=webp&text=Image+not+found">
          </div>
          <div>
            <h1 class="text-sm md:text-lg font-bold w-[16ch] md:w-[20ch] text-ellipsis text-nowrap overflow-hidden">{{ product.title }}</h1>
            <p class="text-xs md:text-base w-[18ch] md:w-[24ch] text-ellipsis text-nowrap overflow-hidden">{{ product.description }}</p>
          </div>
        </div>
      }
    </div>
  `,
})
export class ProductListComponent {
  products = input.required<Product[]>();
}
