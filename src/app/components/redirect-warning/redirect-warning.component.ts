import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-redirect-warning',
  standalone: true,
  imports: [MatButton],
  templateUrl: './redirect-warning.component.html',
  styleUrl: './redirect-warning.component.scss',
})
export class RedirectWarningComponent {
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  cancelHandler(): void {
    this.cancel.emit();
  }

  confirmHandler(): void {
    this.confirm.emit();
  }
}
