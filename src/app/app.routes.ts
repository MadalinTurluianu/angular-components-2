import { Routes } from '@angular/router';
import { OrdersComponent } from './pages';

export const routes: Routes = [
  {
    path: 'orders',
    pathMatch: 'full',
    component: OrdersComponent,
  },

  {
    path: 'orders/new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/add-order/add-order.component').then(
        (component) => component.AddOrderComponent
      ),
  },

  {
    path: 'sculptures/new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/add-sculpture/add-sculpture.component').then(
        (component) => component.AddSculptureComponent
      ),
  },

  {
    path: 'orders/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/order-details/order-details.component').then(
        (component) => component.OrderDetailsComponent
      ),
  },

  {
    path: 'sculptures/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/sculpture-details/sculpture-details.component').then(
        (component) => component.SculptureDetailsComponent
      ),
  },

  { path: '**', redirectTo: '/orders', pathMatch: 'full' },
];
