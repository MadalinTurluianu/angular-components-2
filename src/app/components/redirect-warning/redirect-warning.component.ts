import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-redirect-warning',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './redirect-warning.component.html',
  styleUrl: './redirect-warning.component.scss',
})
export class RedirectWarningComponent {
  @Input() withCancel: boolean = true;
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) message: string = '';
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  cancelHandler(): void {
    if (this.withCancel) this.cancel.emit();
  }

  confirmHandler(): void {
    this.confirm.emit();
  }
}
