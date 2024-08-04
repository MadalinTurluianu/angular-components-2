import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SculpturesService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { SculptureDetailsComponent } from '../../components';
import { AppRoutes, Sculpture } from '../../types';
import { ItemDetailsLayoutComponent } from '../layouts';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-sculptures-details-page',
  standalone: true,
  imports: [
    CommonModule,
    SculptureDetailsComponent,
    ItemDetailsLayoutComponent,
  ],
  templateUrl: './sculptures-details-page.component.html',
  styleUrls: ['./sculptures-details-page.component.scss'],
})
export class SculpturesDetailsPageComponent implements OnInit {
  sculpture$!: Observable<Sculpture | undefined>;
  nextSculptureRoute$!: Observable<string | undefined>;
  previousSculptureRoute$!: Observable<string | undefined>;
  backRoute = AppRoutes.Sculptures;

  constructor(
    private sculpturesService: SculpturesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sculpture$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        const routeId = paramMap.get('id');
        if (!routeId) return of(undefined);

        const sculpture = this.sculpturesService.getSculpture(routeId);
        return of(sculpture);
      })
    );

    this.previousSculptureRoute$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        const routeId = paramMap.get('id');
        if (!routeId) return of(undefined);

        const previousSculpture = this.sculpturesService.getPreviousSculpture(routeId);
        return of(previousSculpture ? `${AppRoutes.Sculptures}/${previousSculpture.id}` : undefined);
      })
    );

    this.nextSculptureRoute$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        const routeId = paramMap.get('id');
        if (!routeId) return of(undefined);

        const nextSculpture = this.sculpturesService.getNextSculpture(routeId);
        return of(nextSculpture ? `${AppRoutes.Sculptures}/${nextSculpture.id}` : undefined);
      })
    );
  }
}