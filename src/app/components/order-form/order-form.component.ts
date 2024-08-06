import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ConfiguredSculpture,
  ConfiguredSculptureDetails,
  Material,
  MaterialsInfo,
  Order,
  Sculpture,
} from '../../types';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConfiguredSculptureComponent } from '../configured-sculpture/configured-sculpture.component';
import { MatIcon } from '@angular/material/icon';
import { FormActionsComponent } from '../form-actions/form-actions.component';
import {
  calculateConfiguredSculpturePrice,
  calculateConfiguredSculptureWeight,
  createFormErrorMessage,
  customValidators,
} from '../../helpers';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    ConfiguredSculptureComponent,
    MatIcon,
    FormActionsComponent,
    OrderSummaryComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  @Input({ required: true }) sculptures!: Sculpture[];
  @Input({ required: true }) materials!: Material[];
  @Input({ required: true }) materialsInfo!: MaterialsInfo;
  @Output() order = new EventEmitter<Order>();
  @Output() cancel = new EventEmitter();

  submitted: boolean = false;
  errorMessage = createFormErrorMessage;

  formData = new FormGroup({
    buyerName: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        customValidators.noWhitespace,
      ],
    }),
    buyerDeliveryAddress: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        customValidators.noWhitespace,
      ],
    }),
    configuredSculpture: new FormControl<Partial<ConfiguredSculpture> | null>(
      null
    ),
    configuredSculptures: new FormControl<ConfiguredSculptureDetails[]>([], {
      validators: [customValidators.noEmptyArray],
    }),
    totalWeight: new FormControl<number>(0, {
      validators: [Validators.max(100)],
    }),
    totalPrice: new FormControl<number>(0),
  });

  updateConfiguredSculptures(
    updatedConfiguredSculptures: ConfiguredSculptureDetails[]
  ) {
    this.formData.patchValue({
      configuredSculptures: updatedConfiguredSculptures,
      totalPrice: updatedConfiguredSculptures.reduce(
        (total, { price }) => total + price,
        0
      ),
      totalWeight: updatedConfiguredSculptures.reduce(
        (total, { weight }) => total + weight,
        0
      ),
    });
  }

  addConfiguredSculpture() {
    if (
      this.formData.value.configuredSculpture?.material == null ||
      this.formData.value.configuredSculpture?.sculpture == null
    ) {
      return;
    }

    const validatedConfiguredSculpture = {
      material: this.formData.value.configuredSculpture.material,
      sculpture: this.formData.value.configuredSculpture.sculpture,
    };

    const configuredSculpture: ConfiguredSculptureDetails = {
      material: validatedConfiguredSculpture.material,
      sculpture: validatedConfiguredSculpture.sculpture,
      price: calculateConfiguredSculpturePrice(
        validatedConfiguredSculpture,
        this.materialsInfo
      ),
      weight: calculateConfiguredSculptureWeight(
        validatedConfiguredSculpture,
        this.materialsInfo
      ),
    };

    const configuredSculptures = this.formData.value.configuredSculptures ?? [];

    this.updateConfiguredSculptures([
      ...configuredSculptures,
      configuredSculpture,
    ]);
  }

  removeConfiguredSculpture(index: number) {
    const configuredSculptures = this.formData.value.configuredSculptures ?? [];
    this.updateConfiguredSculptures(
      configuredSculptures.filter((_, i) => i !== index)
    );
  }

  cancelHandler() {
    this.cancel.emit();
  }

  submitHandler() {
    this.submitted = true;
    const controls = this.formData.controls;

    if (
      controls.configuredSculptures.invalid ||
      controls.totalWeight.invalid ||
      controls.buyerName.invalid ||
      controls.buyerDeliveryAddress.invalid
    ) {
      return;
    }

    const {
      buyerName,
      buyerDeliveryAddress,
      configuredSculptures,
      totalWeight,
      totalPrice,
    } = this.formData.value;

    this.order.emit({
      id: crypto.randomUUID(),
      buyerName: buyerName!,
      buyerDeliveryAddress: buyerDeliveryAddress!,
      configuredSculptures: configuredSculptures!,
      totalWeight: totalWeight!,
      totalPrice: totalPrice!,
    });
  }
}
