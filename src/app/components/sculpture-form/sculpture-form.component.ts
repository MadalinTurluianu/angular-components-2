import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Sculpture } from '../../types';
import { FormActionsComponent } from '../form-actions/form-actions.component';

@Component({
  selector: 'app-sculpture-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormActionsComponent,
  ],
  templateUrl: './sculpture-form.component.html',
  styleUrl: './sculpture-form.component.scss',
})
export class SculptureFormComponent {
  name: string = '';
  basePrice: number | undefined;
  baseWeight: number | undefined;

  @Output() sculpture = new EventEmitter<Sculpture>();
  @Output() cancel = new EventEmitter();

  cancelHandler() {
    this.cancel.emit();
  }

  submitHandler() {
    if (!this.basePrice || !this.baseWeight) return;

    return this.sculpture.emit({
      id: crypto.randomUUID(),
      name: this.name,
      basePrice: this.basePrice,
      baseWeight: this.baseWeight,
    });
  }
}
