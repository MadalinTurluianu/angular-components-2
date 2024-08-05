import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sculpture } from '../../types';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-sculpture',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './sculpture.component.html',
  styleUrl: './sculpture.component.scss',
})
export class SculptureComponent {
  @Input({ required: true }) sculpture!: Sculpture;
  @Output() seeSculptureDetails = new EventEmitter<Sculpture>();
  @Output() deleteSculpture = new EventEmitter<Sculpture>();

  sculptureDetailsClickHandler() {
    this.seeSculptureDetails.emit(this.sculpture);
  }

  deleteSculptureClickHandler() {
    this.deleteSculpture.emit(this.sculpture);
  }
}
