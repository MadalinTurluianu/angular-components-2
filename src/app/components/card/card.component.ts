import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DeleteButtonComponent, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() actionName: string | undefined;
  @Input() withDelete: boolean = false;
  
  @Output() actionClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();

  actionClickHandler(): void {
    this.actionClick.emit();
  }

  deleteClickHandler(): void {
    this.deleteClick.emit();
  }
}
