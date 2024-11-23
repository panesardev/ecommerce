import { Route } from '@angular/router';
import IndexComponent from './pages/index/index.component';
import { titleResolver } from './shared/resolvers/title.resolver';

export const routes: Route[] = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  {
    path: '',
    loadChildren: () => import('./pages/shop/shop.routes'),
    title: titleResolver,
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
    title: titleResolver,
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component'),
    title: titleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: titleResolver,
  },
];
