import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { BRAND } from "@app/app.constants";

export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig?.path;

  let title: string = `Shop with Style`;

  if (path) {
    title = path[0].toUpperCase() + path.slice(1, path.length);
  }

  if (title.endsWith('/:id')) {
    title = title.replace('/:id', '');    
  }

  if (title.includes('-')) {
    title = title.replaceAll('-', ' ');
  }

  if (path === '**') {
    title = 'Oops!';
  }

  return `${title} | ${BRAND}`;
};