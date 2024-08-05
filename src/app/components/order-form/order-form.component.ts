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
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConfiguredSculptureComponent } from '../configured-sculpture/configured-sculpture.component';
import { MatIcon } from '@angular/material/icon';
import { FormActionsComponent } from '../form-actions/form-actions.component';
import {
  calculateConfiguredSculpturePrice,
  calculateConfiguredSculptureWeight,
} from '../../helpers';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ConfiguredSculptureComponent,
    MatIcon,
    FormActionsComponent,
    OrderSummaryComponent,
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

  configuredSculptures: ConfiguredSculptureDetails[] = [];
  totalWeight: number = 0;
  totalPrice: number = 0;

  formData = new FormGroup({
    buyerName: new FormControl<string>(''),
    buyerDeliveryAddress: new FormControl<string>(''),
    configuredSculpture: new FormControl<ConfiguredSculpture | null>(null),
  });

  resetWeightAndPrice() {
    this.totalWeight = this.configuredSculptures.reduce(
      (total, { weight }) => total + weight,
      0
    );

    this.totalPrice = this.configuredSculptures.reduce(
      (total, { price }) => total + price,
      0
    );
  }

  addConfiguredSculpture() {
    const configuredSculpture = this.formData.value.configuredSculpture;

    if (!configuredSculpture?.material || !configuredSculpture?.sculpture) {
      return;
    }

    this.configuredSculptures.push({
      material: configuredSculpture.material,
      sculpture: configuredSculpture.sculpture,
      price: calculateConfiguredSculpturePrice(
        configuredSculpture,
        this.materialsInfo
      ),
      weight: calculateConfiguredSculptureWeight(
        configuredSculpture,
        this.materialsInfo
      ),
    });

    this.resetWeightAndPrice();
  }

  removeConfiguredSculpture(index: number) {
    this.configuredSculptures.splice(index, 1);
    this.resetWeightAndPrice();
  }

  cancelHandler() {
    this.cancel.emit();
  }

  submitHandler() {
    if (
      this.formData.value.buyerName &&
      this.formData.value.buyerDeliveryAddress &&
      this.configuredSculptures.length > 0
    ) {
      this.order.emit({
        id: crypto.randomUUID(),
        buyerName: this.formData.value.buyerName,
        buyerDeliveryAddress: this.formData.value.buyerDeliveryAddress,
        configuredSculptures: this.configuredSculptures,
        totalWeight: this.totalWeight,
        totalPrice: this.totalPrice,
      });
    }
  }
}
