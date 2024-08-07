import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ConfiguredSculpture, Material, Sculpture } from '../../types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

type OnChangeFunction = (value: Partial<ConfiguredSculpture>) => void;

@Component({
  selector: 'app-configured-sculpture',
  standalone: true,
  imports: [MatSelectModule, MatButtonModule],
  templateUrl: './configured-sculpture.component.html',
  styleUrl: './configured-sculpture.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ConfiguredSculptureComponent,
    },
  ],
})
export class ConfiguredSculptureComponent implements ControlValueAccessor {
  @Input() sculptures: Sculpture[] = [];
  @Input() materials: Material[] = [];

  @Output() order = new EventEmitter<ConfiguredSculpture>();

  sculpture: Sculpture | undefined;
  material: Material | undefined;
  disabled: Boolean = false;
  onChange: OnChangeFunction = () => {};
  onTouch: VoidFunction = () => {};

  changeHandler(): void {
    this.onChange({
      material: this.material,
      sculpture: this.sculpture,
    });
  }

  // ControlValueAccessor

  writeValue(value: ConfiguredSculpture): void {
    this.material = value?.material;
    this.sculpture = value?.sculpture;
  }

  registerOnChange(fn: OnChangeFunction): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: VoidFunction): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('focus')
  onFocus() {
    this.onTouch();
  }
}
