import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Sculpture } from '../../types';

@Component({
  selector: 'app-sculpture-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './sculpture-form.component.html',
  styleUrl: './sculpture-form.component.scss',
})
export class SculptureFormComponent {
  name: string = '';
  basePrice: number = 0;
  baseWeight: number = 0;

  @Output() sculpture = new EventEmitter<Sculpture>();

  submitHandler() {
    return this.sculpture.emit({
      id: crypto.randomUUID(),
      name: this.name,
      basePrice: this.basePrice,
      baseWeight: this.baseWeight,
    });
  }
}
