import { Route } from "@angular/router";
import { titleResolver } from "@app/shared/resolvers/title.resolver";

const routes: Route[] = [
  {
    path: 'new-arrivals',
    loadComponent: () => import('./new-arrivals/new-arrivals.component'),
    title: titleResolver,
  },
  {
    path: 'mens',
    loadComponent: () => import('./mens/mens.component'),
    title: titleResolver,
  },
  {
    path: 'womens',
    loadComponent: () => import('./womens/womens.component'),
    title: titleResolver,
  },
  {
    path: 'shoes',
    loadComponent: () => import('./shoes/shoes.component'),
    title: titleResolver,
  },
  {
    path: 'watches',
    loadComponent: () => import('./watches/watches.component'),
    title: titleResolver,
  },
];

export default routes;