import { Route } from '@angular/router';
import IndexComponent from './pages/index/index.component';
import { titleResolver } from './shared/resolvers/title.resolver';
import { productResolver, productTitleResolver } from './pages/product/product.resolver';
export const routes: Route[] = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
    title: titleResolver,
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component'),
    title: titleResolver,
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component'),
    title: titleResolver,
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    title: titleResolver,
  },
  {
    path: 'mens',
    loadComponent: () => import('./pages/mens/mens.component'),
    title: titleResolver,
  },
  {
    path: 'new-arrivals',
    loadComponent: () => import('./pages/new-arrivals/new-arrivals.component'),
    title: titleResolver,
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component'),
    title: titleResolver,
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component'),
    title: titleResolver,
  },
  {
    path: 'shoes',
    loadComponent: () => import('./pages/shoes/shoes.component'),
    title: titleResolver,
  },
  {
    path: 'view/:id',
    loadComponent: () => import('./pages/product/product.component'),
    title: productTitleResolver,
    resolve: {
      product: productResolver,
    }
  },
  {
    path: 'watches',
    loadComponent: () => import('./pages/watches/watches.component'),
    title: titleResolver,
  },
  {
    path: 'womens',
    loadComponent: () => import('./pages/womens/womens.component'),
    title: titleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: titleResolver,
  },
];
