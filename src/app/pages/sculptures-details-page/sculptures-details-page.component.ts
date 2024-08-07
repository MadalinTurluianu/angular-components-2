import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SculpturesService } from '../../services';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SculptureFormComponent } from '../../components';
import { AppRoutes, Sculpture } from '../../types';
import { ItemDetailsLayoutComponent } from '../layouts';
import { switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { RedirectWarningComponent } from '../../components/redirect-warning/redirect-warning.component';

@Component({
  selector: 'app-sculptures-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ItemDetailsLayoutComponent,
    SculptureFormComponent,
    RedirectWarningComponent,
  ],
  templateUrl: './sculptures-details-page.component.html',
  styleUrls: ['./sculptures-details-page.component.scss'],
})
export class SculpturesDetailsPageComponent implements OnInit {
  sculpture$?: Observable<Sculpture | undefined>;
  nextSculptureRoute$?: Observable<string | undefined>;
  previousSculptureRoute$?: Observable<string | undefined>;
  routerSubscription?: Subscription;
  backRoute: string = AppRoutes.Sculptures;
  dataSaved: boolean = true;
  warningOpen: boolean = false;
  redirectUrl: string | undefined;

  constructor(
    private sculpturesService: SculpturesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.dataSaved = false;
        this.warningOpen = false;
      }
    });

    this.sculpture$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const routeId = paramMap.get('id');
        if (!routeId) return of(undefined);

        const sculpture = this.sculpturesService.getSculpture(routeId);
        return of(sculpture);
      })
    );

    this.previousSculptureRoute$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const routeId = paramMap.get('id');
        if (!routeId) return of(undefined);

        const previousSculpture =
          this.sculpturesService.getPreviousSculpture(routeId);
        return of(
          previousSculpture
            ? `${AppRoutes.Sculptures}/${previousSculpture.id}`
            : undefined
        );
      })
    );

    this.nextSculptureRoute$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const routeId = paramMap.get('id');
        if (!routeId) return of(undefined);

        const nextSculpture = this.sculpturesService.getNextSculpture(routeId);
        return of(
          nextSculpture
            ? `${AppRoutes.Sculptures}/${nextSculpture.id}`
            : undefined
        );
      })
    );
  }

  cancel(): void {
    this.router.navigate([AppRoutes.Sculptures]);
  }

  updateSculpture(sculpture: Sculpture): void {
    this.sculpturesService.upsertSculpture(sculpture);
    this.router.navigate([AppRoutes.Sculptures]);
  }

  confirmRedirect(): void {
    this.dataSaved = true;
    this.router.navigate([this.redirectUrl]);
  }

  cancelRedirect(): void {
    this.warningOpen = false;
  }

  canDeactivate(): boolean {
    this.warningOpen = true;
    return this.dataSaved;
  }

  setRedirect(url: string): void {
    this.redirectUrl = url;
  }

  setFormDirty(dirty: boolean): void {    
    this.dataSaved = !dirty;
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}
