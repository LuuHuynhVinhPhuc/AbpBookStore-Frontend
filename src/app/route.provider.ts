import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: 'card',
        name: 'Card',
        iconClass: 'fas fa-shopping-cart',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: 'book-management',
        name: 'Book Management',
        iconClass: 'fas fa-book-open',
        order: 1,
        layout: eLayoutType.application,
      },
    ]);
  };
}
