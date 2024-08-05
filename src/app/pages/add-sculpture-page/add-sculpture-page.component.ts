import { Component } from '@angular/core';
import { SculptureFormComponent } from '../../components';
import { AppRoutes, Sculpture } from '../../types';
import { SculpturesService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sculpture-page',
  standalone: true,
  imports: [SculptureFormComponent],
  templateUrl: './add-sculpture-page.component.html',
  styleUrl: './add-sculpture-page.component.scss',
})
export class AddSculpturePageComponent {
  sculptureService: SculpturesService;
  router: Router;

  constructor(sculptureService: SculpturesService, router: Router) {
    this.sculptureService = sculptureService;
    this.router = router;
  }

  cancelHandler() {
    this.router.navigate([AppRoutes.Sculptures]);
  }

  onSculptureCreated(sculpture: Sculpture) {
    this.sculptureService.addSculpture(sculpture);
    this.router.navigate([AppRoutes.Sculptures]);
  }
}
