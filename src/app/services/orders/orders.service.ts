import { Injectable } from '@angular/core';
import { Order } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: Order[] = [];

  constructor() {
    const savedOrders = localStorage.getItem('orders');
    const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
    this.orders = orders;
  }

  saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  addOrder(order: Order): Order[] {
    this.orders.push(order);
    this.saveOrders();
    return this.orders;
  }

  removeOrder(id: string): Order[] {
    const filteredOrders = this.orders.filter((order) => order.id !== id);
    this.saveOrders();
    return filteredOrders;
  }

  getOrder(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  getNextOrder(id: string): Order | undefined {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index < 0) return;

    const nextIndex = index + 1 >= this.orders.length ? 0 : index + 1;
    return this.orders[nextIndex];
  }

  getPreviousOrder(id: string): Order | undefined {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index < 0) return;

    const previousIndex = index - 1 < 0 ? this.orders.length - 1 : index - 1;
    return this.orders[previousIndex];
  }
}
