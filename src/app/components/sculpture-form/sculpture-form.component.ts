import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Sculpture } from '../../types';
import { FormActionsComponent } from '../form-actions/form-actions.component';
import { createFormErrorMessage, customValidators } from '../../helpers';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-sculpture-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormActionsComponent,
  ],
  templateUrl: './sculpture-form.component.html',
  styleUrl: './sculpture-form.component.scss',
})
export class SculptureFormComponent {
  @Output() sculpture = new EventEmitter<Sculpture>();
  @Output() cancel = new EventEmitter();

  formData = new FormGroup({
    name: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        customValidators.noWhitespace,
      ],
    }),
    basePrice: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    baseWeight: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
  });

  errorMessage = createFormErrorMessage;

  cancelHandler() {
    this.cancel.emit();
  }

  submitHandler() {
    const controls = this.formData.controls;

    if (
      controls.basePrice.invalid ||
      controls.name.invalid ||
      controls.baseWeight.invalid
    ) {
      return;
    }

    const { basePrice, baseWeight, name } = this.formData.value;

    return this.sculpture.emit({
      id: crypto.randomUUID(),
      name: name!.trim(),
      basePrice: basePrice!,
      baseWeight: baseWeight!,
    });
  }
}
