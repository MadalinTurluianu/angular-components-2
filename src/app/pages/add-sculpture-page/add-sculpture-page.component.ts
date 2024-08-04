import { Component } from '@angular/core';
import { SculptureFormComponent } from '../../components';
import { Sculpture } from '../../types';
import { SculpturesService } from '../../services';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-add-sculpture-page',
  standalone: true,
  imports: [SculptureFormComponent, LayoutComponent],
  templateUrl: './add-sculpture-page.component.html',
  styleUrl: './add-sculpture-page.component.scss',
})
export class AddSculpturePageComponent {
  sculptureService: SculpturesService;

  constructor(sculptureService: SculpturesService) {
    this.sculptureService = sculptureService;
  }

  onSculptureCreated(sculpture: Sculpture) {
    this.sculptureService.addSculpture(sculpture);
  }
}
