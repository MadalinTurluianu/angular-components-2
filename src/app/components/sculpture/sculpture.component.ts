import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sculpture } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sculpture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sculpture.component.html',
  styleUrl: './sculpture.component.scss',
})
export class SculptureComponent {
  @Input({ required: true }) sculpture!: Sculpture;
  @Output() selectSculpture = new EventEmitter<Sculpture>();

  clickHandler() {
    this.selectSculpture.emit(this.sculpture);
  }
}
