import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { OrderComponent } from '../../components';
import { Order } from '../../types';
import { OrdersService } from '../../services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [LayoutComponent, OrderComponent, CommonModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent {
  orders: Order[] = [];
  router: Router;

  constructor(ordersService: OrdersService, router: Router) {
    this.orders = ordersService.getAllOrders();
    this.router = router;
  }

  orderSelectedHandler(order: Order) {
    this.router.navigate(['orders', order.id]);
  }
}
