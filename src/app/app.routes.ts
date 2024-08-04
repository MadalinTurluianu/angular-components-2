import { Routes } from '@angular/router';
import { OrdersPageComponent } from './pages';

export const routes: Routes = [
  {
    path: 'orders',
    pathMatch: 'full',
    component: OrdersPageComponent,
  },

  {
    path: 'sculptures',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then((component) => component.SculpturesPageComponent),
  },

  {
    path: 'orders/new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then((component) => component.AddOrderPageComponent),
  },

  {
    path: 'sculptures/new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.AddSculpturePageComponent
      ),
  },

  {
    path: 'orders/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.OrderDetailsPageComponent
      ),
  },

  {
    path: 'sculptures/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.SculpturesDetailsPageComponent
      ),
  },

  { path: '**', redirectTo: '/orders', pathMatch: 'full' },
];
