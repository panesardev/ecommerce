import { Route } from "@angular/router";
import { titleResolver } from "@app/shared/resolvers/title.resolver";

const routes: Route[] = [
  {
    path: 'new-arrivals',
    loadComponent: () => import('./new-arrivals/new-arrivals.component'),
    title: titleResolver,
  },
];

export default routes;