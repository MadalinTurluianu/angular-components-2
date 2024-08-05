import { Component, Input, OnInit } from '@angular/core';
import { MaterialsInfo, Order } from '../../types';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  @Input({ required: true }) order!: Order;
  @Input({ required: true }) materialsInfo!: MaterialsInfo;

  totalPrice: number = 0;
  totalWeight: number = 0;

  ngOnInit() {
    this.totalPrice = this.order.configuredSculptures.reduce(
      (totalValue, { sculpture, material }) => {
        return (
          totalValue +
          sculpture.basePrice * this.materialsInfo[material].priceMultiplier
        );
      },
      0
    );

    this.totalWeight = this.order.configuredSculptures.reduce(
      (totalValue, { sculpture, material }) => {
        return (
          totalValue +
          sculpture.baseWeight * this.materialsInfo[material].weightMultiplier
        );
      },
      0
    );
  }
}
