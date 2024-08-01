import { Routes } from '@angular/router';
import { OrdersComponent } from './components';

export const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },

  {
    path: 'orders',
    pathMatch: 'full',
    component: OrdersComponent,
  },

  {
    path: 'orders/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/order-details/order-details.component').then(
        (component) => component.OrderDetailsComponent
      ),
  },

  {
    path: 'sculptures/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/sculpture-details/sculpture-details.component').then(
        (component) => component.SculptureDetailsComponent
      ),
  },

  {
    path: 'orders/new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/order-form/order-form.component').then(
        (component) => component.OrderFormComponent
      ),
  },

  {
    path: 'sculptures/new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/sculpture-form/sculpture-form.component').then(
        (component) => component.SculptureFormComponent
      ),
  },
];
