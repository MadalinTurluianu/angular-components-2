import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfiguredSculptureDetails } from '../../types';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  @Input({ required: true })
  configuredSculptures!: ConfiguredSculptureDetails[];
  @Input({ required: true }) totalPrice!: number;
  @Input({ required: true }) totalWeight!: number;
  @Output() remove: EventEmitter<number> = new EventEmitter();

  deleteHandler(index: number) {
    this.remove.emit(index);
  }
}
