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
  MaterialInfo,
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
import { Observable } from 'rxjs';

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
  @Input({ required: true }) materialsInfo!: MaterialInfo;
  @Output() order = new EventEmitter<Order>();

  configuredSculptures: Observable<ConfiguredSculpture[]> = new Observable<
    ConfiguredSculpture[]
  >();
  tableColumns: string[] = [
    'No',
    'Sculpture',
    'Material',
    'Weight (kg)',
    'Price (€)',
  ];

  formData = new FormGroup({
    buyerName: new FormControl<string>(''),
    buyerDeliveryAddress: new FormControl<string>(''),
    configuredSculpture: new FormControl<Partial<ConfiguredSculpture>>({}),
  });

  addConfiguredSculpture() {
    const configuredSculpture = this.formData.value.configuredSculpture;
    console.log(configuredSculpture);

    if (configuredSculpture?.material && configuredSculpture?.sculpture) {
      this.configuredSculptures.subscribe((configuredSculptures) => {
        configuredSculptures.push({
          material: configuredSculpture.material!,
          sculpture: configuredSculpture.sculpture!,
        });
      });
      this.formData.value.configuredSculpture = null;
      console.log(this.configuredSculptures);
    }
  }

  submitHandler() {}
}
