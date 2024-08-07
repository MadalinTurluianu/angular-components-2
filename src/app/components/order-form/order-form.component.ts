import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
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
  calculateTotalPrice,
  calculateTotalWeight,
  createFormErrorMessage,
  formValidators,
} from '../../helpers';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Subscription } from 'rxjs';

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
})
export class OrderFormComponent implements OnChanges, OnInit {
  @Input() order: Order | null | undefined;
  @Input({ required: true }) sculptures!: Sculpture[];
  @Input({ required: true }) materials!: Material[];
  @Input({ required: true }) materialsInfo!: MaterialsInfo;

  @Output() safeSubmit = new EventEmitter<Order>();
  @Output() cancel = new EventEmitter();
  @Output() dirty = new EventEmitter<boolean>();

  submitted: boolean = false;
  formStatusSubscription?: Subscription;
  errorMessage = createFormErrorMessage;

  formData = new FormGroup({
    buyerName: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        formValidators.noWhitespace,
      ],
    }),
    buyerDeliveryAddress: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        formValidators.noWhitespace,
      ],
    }),
    configuredSculpture: new FormControl<Partial<ConfiguredSculpture> | null>(
      null
    ),
    configuredSculptures: new FormControl<ConfiguredSculptureDetails[]>([], {
      validators: [formValidators.noEmptyArray],
    }),
    totalWeight: new FormControl<number>(0, {
      validators: [Validators.max(100)],
    }),
    totalPrice: new FormControl<number>(0),
  });

  ngOnChanges(): void {
    this.formData.reset();

    if (this.order) {
      this.formData.patchValue({
        buyerName: this.order.buyerName,
        buyerDeliveryAddress: this.order.buyerDeliveryAddress,
      });
      this.updateConfiguredSculptures(this.order.configuredSculptures);
    }
  }

  ngOnInit(): void {
    this.formStatusSubscription = this.formData.valueChanges.subscribe(() => {
      this.dirty.emit(this.formData.dirty);
    });
  }

  updateConfiguredSculptures(updatedValue: ConfiguredSculptureDetails[]): void {
    this.formData.patchValue({
      configuredSculptures: updatedValue,
      totalPrice: calculateTotalPrice(updatedValue),
      totalWeight: calculateTotalWeight(updatedValue),
    });
  }

  addConfiguredSculpture(): void {
    if (!this.formData.value.configuredSculpture) return;

    const { material, sculpture } = this.formData.value.configuredSculpture;

    if (material == null || sculpture == null) {
      return;
    }

    const configuredSculpture: ConfiguredSculptureDetails = {
      material: material,
      sculpture: sculpture,
      price: calculateConfiguredSculpturePrice(
        { material, sculpture },
        this.materialsInfo
      ),
      weight: calculateConfiguredSculptureWeight(
        { material, sculpture },
        this.materialsInfo
      ),
    };

    const configuredSculptures = this.formData.value.configuredSculptures ?? [];

    this.updateConfiguredSculptures([
      ...configuredSculptures,
      configuredSculpture,
    ]);
  }

  removeConfiguredSculpture(index: number): void {
    const configuredSculptures = this.formData.value.configuredSculptures ?? [];
    this.updateConfiguredSculptures(
      configuredSculptures.filter((_, i) => i !== index)
    );
    this.dirty.emit(true);
  }

  cancelHandler(): void {
    this.cancel.emit();
  }

  submitHandler(): void {
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

    this.safeSubmit.emit({
      id: this.order?.id ?? crypto.randomUUID(),
      buyerName: buyerName!.trim(),
      buyerDeliveryAddress: buyerDeliveryAddress!.trim(),
      configuredSculptures: configuredSculptures!,
      totalWeight: totalWeight!,
      totalPrice: totalPrice!,
    });
  }

  onDestroy(): void {
    this.formStatusSubscription?.unsubscribe();
  }
}
