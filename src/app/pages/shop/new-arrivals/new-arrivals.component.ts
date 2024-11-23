import { Component, computed, inject, signal } from '@angular/core';
import { Category, PriceFilter } from '@app/domains/products/product.interface';
import { ProductService } from '@app/domains/products/product.service';
import { applyPriceFilter } from '@app/domains/products/product.utils';

@Component({
  selector: 'app-new-arrivals',
  imports: [],
  templateUrl: './new-arrivals.component.html',
})
export default class NewArrivalsComponent {
  private productService = inject(ProductService);

  category = signal<Category>(null);
  priceFilter = signal<PriceFilter>('DEFAULT');

  products = computed(() => {
    const products = this.productService.products();
    const category = this.category();
    const priceFilter = this.priceFilter();

    let filteredProducts = [...products];

    if (category) {
      if (category.slug.startsWith('mens')) {
        filteredProducts = filteredProducts.filter(
          product => product.category.startsWith(category.slug)
        );
      }
      else if (category.slug.startsWith('womens')) {
        filteredProducts = filteredProducts.filter(
          product => product.category.startsWith(category.slug)
        );
      }
      else {
        filteredProducts = filteredProducts.filter(
          product => product.category === category.slug
        );
      }
    }

    if (priceFilter) {
      filteredProducts = applyPriceFilter(filteredProducts, priceFilter);
    }

    return filteredProducts;
  });

  categories = computed(() => {
    let transformedCategories = this.productService.categories()
      // Filter out mens-specific categories
      .filter(category => !category.slug.startsWith('mens'))
      // Filter out womens-specific categories
      .filter(category => !category.slug.startsWith('womens'));

    // Create generic mens and womens categories
    const mens: Category = { slug: 'mens', name: 'Mens' };
    const womens: Category = { slug: 'womens', name: 'Womens' };

    // Return with added mens and womens categories
    return [mens, womens, ...transformedCategories];
  });

  addToCart() {
    
  }

}
