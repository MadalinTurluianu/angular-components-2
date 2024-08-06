import { Routes } from '@angular/router';
import { OrdersPageComponent } from './pages';
import { AppRoutes } from './types';
import { CanDeactivateGuard } from './services';

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
    canDeactivate: [CanDeactivateGuard],
  },

  {
    path: AppRoutes.AddSculpture,
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.AddSculpturePageComponent
      ),
    canDeactivate: [CanDeactivateGuard],
  },

  {
    path: AppRoutes.Orders + '/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.OrderDetailsPageComponent
      ),
    canDeactivate: [CanDeactivateGuard],
  },

  {
    path: AppRoutes.Sculptures + '/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages').then(
        (component) => component.SculpturesDetailsPageComponent
      ),
    canDeactivate: [CanDeactivateGuard],
  },

  { path: '**', redirectTo: AppRoutes.Orders, pathMatch: 'full' },
];
