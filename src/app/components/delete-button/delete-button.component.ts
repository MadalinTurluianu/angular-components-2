import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
})
export class DeleteButtonComponent {
  @Output() click = new EventEmitter();

  clickHandler(event: Event): void {
    event.stopPropagation();    
    this.click.emit();
  }
}
