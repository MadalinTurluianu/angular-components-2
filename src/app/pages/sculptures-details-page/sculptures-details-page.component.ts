import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SculpturesService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { SculptureDetailsComponent } from '../../components';
import { AppRoutes, Sculpture } from '../../types';
import { ItemDetailsLayoutComponent } from '../layouts';

@Component({
  selector: 'app-sculptures-details-page',
  standalone: true,
  imports: [
    CommonModule,
    SculptureDetailsComponent,
    ItemDetailsLayoutComponent,
  ],
  templateUrl: './sculptures-details-page.component.html',
  styleUrl: './sculptures-details-page.component.scss',
})
export class SculpturesDetailsPageComponent {
  sculpture: Sculpture | undefined;
  nextSculptureRoute: string | undefined;
  previousSculptureRoute: string | undefined;
  backRoute = AppRoutes.Sculptures;

  constructor(sculpturesService: SculpturesService, route: ActivatedRoute) {
    const routeId = route.snapshot.paramMap.get('id');
    if (!routeId) return;

    this.sculpture = sculpturesService.getSculpture(routeId);
    if (this.sculpture == null) return;

    const previousSculpture = sculpturesService.getPreviousSculpture(routeId);
    this.previousSculptureRoute = `${AppRoutes.Orders}/${
      previousSculpture!.id
    }`;

    const nextSculpture = sculpturesService.getNextSculpture(routeId);
    this.nextSculptureRoute = `${AppRoutes.Orders}/${nextSculpture!.id}`;
  }
}
