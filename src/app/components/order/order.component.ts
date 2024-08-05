import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../types';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    DeleteButtonComponent,
    MatButtonModule,
    CardComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input({ required: true }) order!: Order;
  @Output() seeOrderDetails = new EventEmitter<Order>();
  @Output() deleteOrder = new EventEmitter<Order>();

  orderDetailsClickHandler() {
    this.seeOrderDetails.emit(this.order);
  }

  deleteOrderClickHandler() {
    this.deleteOrder.emit(this.order);
  }
}
