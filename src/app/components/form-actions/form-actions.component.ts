import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-actions',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './form-actions.component.html',
  styleUrl: './form-actions.component.scss',
})
export class FormActionsComponent {
  @Output() cancel = new EventEmitter();

  cancelClickHandler(): void {
    this.cancel.emit();
  }
}
