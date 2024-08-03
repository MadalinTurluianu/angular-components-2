import { Injectable } from '@angular/core';
import { Order } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor() {}

  getAllOrders(): Order[] {
    const savedOrders = localStorage.getItem('orders');
    const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
    return orders;
  }

  addOrder(order: Order) {
    const orders = this.getAllOrders();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  removeOrder(id: string) {
    const orders = this.getAllOrders();
    const filteredOrders = orders.filter((order) => order.id !== id);
    localStorage.setItem('orders', JSON.stringify(filteredOrders));
    return filteredOrders
  }

  getOrder(id: string) {
    const orders = this.getAllOrders();
    const order = orders.find((order) => order.id === id);
    return order ?? null;
  }
}
