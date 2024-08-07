import { Injectable } from '@angular/core';
import { Order } from '../../types';
import { modelValidators } from '../../helpers';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: Order[] = [];

  constructor() {
    const savedOrders = localStorage.getItem('orders');
    let orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
    orders = orders.filter(modelValidators.order);
    this.orders = orders;
  }

  saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  upsertOrder(order: Order): Order[] {
    const orderIndex = this.orders.findIndex(({ id }) => id === order.id);

    if (orderIndex >= 0) {
      this.orders[orderIndex] = order;
    } else {
      this.orders.push(order);
    }

    this.saveOrders();
    return this.orders;
  }

  deleteOrder(id: string): Order[] {
    this.orders = this.orders.filter((order) => order.id !== id);
    this.saveOrders();
    return this.orders;
  }

  getOrder(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  getNextOrder(id: string): Order | undefined {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index < 0) return;

    if (index + 1 >= this.orders.length) return undefined;

    return this.orders[index + 1];
  }

  getPreviousOrder(id: string): Order | undefined {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index < 0) return;

    if (index - 1 < 0) return undefined;

    return this.orders[index - 1];
  }
}
