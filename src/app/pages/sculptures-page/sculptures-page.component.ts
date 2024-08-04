import { Component } from '@angular/core';
import { SculptureComponent } from '../../components/sculpture/sculpture.component';
import { SculpturesService } from '../../services';
import { Router } from '@angular/router';
import { Sculpture } from '../../types';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from '../layouts';

@Component({
  selector: 'app-sculptures-page',
  standalone: true,
  imports: [BaseLayoutComponent, SculptureComponent, CommonModule],
  templateUrl: './sculptures-page.component.html',
  styleUrl: './sculptures-page.component.scss',
})
export class SculpturesPageComponent {
  sculptures: Sculpture[] = [];
  router: Router;

  constructor(sculpturesService: SculpturesService, router: Router) {
    this.sculptures = sculpturesService.getAllSculptures();
    this.router = router;
  }

  sculptureSelectedHandler(order: Sculpture) {
    this.router.navigate(['sculptures', order.id]);
  }
}
