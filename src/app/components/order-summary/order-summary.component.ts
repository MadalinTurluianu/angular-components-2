import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfiguredSculptureDetails } from '../../types';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon, DeleteButtonComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  @Input({ required: true }) totalPrice!: number;
  @Input({ required: true }) totalWeight!: number;
  @Input({ required: true })
  configuredSculptures!: ConfiguredSculptureDetails[];

  @Output() remove: EventEmitter<number> = new EventEmitter();

  deleteHandler(index: number): void {
    this.remove.emit(index);
  }
}
