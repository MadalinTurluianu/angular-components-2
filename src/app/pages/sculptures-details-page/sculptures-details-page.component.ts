import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SculpturesService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { SculptureDetailsComponent } from '../../components';
import { Sculpture } from '../../types';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-sculptures-details-page',
  standalone: true,
  imports: [CommonModule, SculptureDetailsComponent, LayoutComponent],
  templateUrl: './sculptures-details-page.component.html',
  styleUrl: './sculptures-details-page.component.scss',
})
export class SculpturesDetailsPageComponent {
  sculpture: Sculpture | null = null;

  constructor(sculpturesService: SculpturesService, route: ActivatedRoute) {
    const routeId = route.snapshot.paramMap.get('id');
    if (!routeId) return;

    this.sculpture = sculpturesService.getSculpture(routeId);
  }
}
