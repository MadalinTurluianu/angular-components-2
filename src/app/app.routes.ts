import { Routes } from '@angular/router';
import { OrdersPageComponent } from './pages';
import { AppRoutes } from './types';

export const routes: Routes = [
  {
    path: AppRoutes.Orders,
    pathMatch: 'full',
    component: OrdersPageComponent,
  },

  {
    path: AppRoutes.Sculptures,
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then((component) => component.SculpturesPageComponent),
  },

  {
    path: AppRoutes.AddOrder,
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then((component) => component.AddOrderPageComponent),
  },

  {
    path: AppRoutes.AddSculpture,
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.AddSculpturePageComponent
      ),
  },

  {
    path: AppRoutes.Orders + '/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.OrderDetailsPageComponent
      ),
  },

  {
    path: AppRoutes.Sculptures + '/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.SculpturesDetailsPageComponent
      ),
  },

  { path: '**', redirectTo: AppRoutes.Orders, pathMatch: 'full' },
];
