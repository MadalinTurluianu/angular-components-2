import { Component } from '@angular/core';
import { OrderComponent } from '../../components';
import { Order } from '../../types';
import { OrdersService } from '../../services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseLayoutComponent } from '../layouts';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [BaseLayoutComponent, OrderComponent, CommonModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService, private router: Router) {
    this.orders = this.ordersService.getAllOrders();
  }

  orderSelectedHandler(order: Order) {
    this.router.navigate(['orders', order.id]);
  }

  orderDeletedHandler(order: Order) {
    this.orders = this.ordersService.deleteOrder(order.id);
  }
}
