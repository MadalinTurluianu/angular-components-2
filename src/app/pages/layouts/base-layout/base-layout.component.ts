import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppRoutes } from '../../../types';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {
  ordersRoute = AppRoutes.Orders;
  sculpturesRoute = AppRoutes.Sculptures;
  addOrderRoute = AppRoutes.AddOrder;
  addSculptureRoute = AppRoutes.AddSculpture;
}
