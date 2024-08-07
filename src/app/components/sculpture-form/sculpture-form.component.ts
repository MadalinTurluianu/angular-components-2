import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
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
import { createFormErrorMessage, formValidators } from '../../helpers';
import { Subscription } from 'rxjs';

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
export class SculptureFormComponent implements OnChanges {
  @Input() sculpture: Sculpture | null | undefined;

  @Output() submit = new EventEmitter<Sculpture>();
  @Output() cancel = new EventEmitter();
  @Output() dirty = new EventEmitter<boolean>();

  formStatusSubscription?: Subscription;
  errorMessage = createFormErrorMessage;

  formData = new FormGroup({
    name: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        formValidators.noWhitespace,
      ],
    }),
    basePrice: new FormControl<number | undefined>(undefined, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    baseWeight: new FormControl<number | undefined>(undefined, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
  });

  ngOnChanges(): void {
    this.formData.reset();

    if (this.sculpture) {
      this.formData.patchValue({
        name: this.sculpture.name,
        basePrice: this.sculpture.basePrice,
        baseWeight: this.sculpture.baseWeight,
      });
    }
  }

  ngOnInit(): void {
    this.formStatusSubscription = this.formData.valueChanges.subscribe(() => {
      this.dirty.emit(this.formData.dirty);
    });
  }

  cancelHandler(): void {
    this.cancel.emit();
  }

  submitHandler(): void {
    const controls = this.formData.controls;

    if (
      controls.basePrice.invalid ||
      controls.name.invalid ||
      controls.baseWeight.invalid
    ) {
      return;
    }

    const { basePrice, baseWeight, name } = this.formData.value;

    return this.submit.emit({
      id: this.sculpture?.id ?? crypto.randomUUID(),
      name: name!.trim(),
      basePrice: basePrice!,
      baseWeight: baseWeight!,
    });
  }

  onDestroy(): void {
    this.formStatusSubscription?.unsubscribe();
  }
}
