import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ConfiguredSculpture,
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
import { MatTableModule } from '@angular/material/table';

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
    MatTableModule,
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

  configuredSculptures: ConfiguredSculpture[] = [];

  formData = new FormGroup({
    buyerName: new FormControl<string>(''),
    buyerDeliveryAddress: new FormControl<string>(''),
    configuredSculpture: new FormControl<Partial<ConfiguredSculpture>>({
      material: undefined,
      sculpture: undefined,
    }),
  });

  addConfiguredSculpture() {
    const configuredSculpture = this.formData.value.configuredSculpture;

    if (configuredSculpture?.material && configuredSculpture?.sculpture) {
      this.configuredSculptures.push({
        material: configuredSculpture.material,
        sculpture: configuredSculpture.sculpture,
      });
    }
  }

  removeConfiguredSculpture(index: number) {
    this.configuredSculptures.splice(index, 1);
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
      });
    }
  }
}
