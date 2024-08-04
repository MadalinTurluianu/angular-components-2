import { Component, Input } from '@angular/core';
import { Sculpture } from '../../types';

@Component({
  selector: 'app-sculpture-details',
  standalone: true,
  imports: [],
  templateUrl: './sculpture-details.component.html',
  styleUrl: './sculpture-details.component.scss',
})
export class SculptureDetailsComponent {
  @Input({ required: true }) sculpture!: Sculpture;
}
