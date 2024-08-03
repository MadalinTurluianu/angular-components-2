import { Component } from '@angular/core';
import { SculptureFormComponent } from '../../components';
import { Sculpture } from '../../types';
import { SculpturesService } from '../../services';

@Component({
  selector: 'app-add-sculpture',
  standalone: true,
  imports: [SculptureFormComponent],
  templateUrl: './add-sculpture.component.html',
  styleUrl: './add-sculpture.component.scss',
})
export class AddSculptureComponent {
  sculptureService: SculpturesService;

  constructor(sculptureService: SculpturesService) {
    this.sculptureService = sculptureService;
  }

  onSculptureCreated(sculpture: Sculpture) {
    this.sculptureService.addSculpture(sculpture);
  }
}
