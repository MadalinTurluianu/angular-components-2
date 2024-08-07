import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { OrderFormComponent } from '../../components';
import { ItemDetailsLayoutComponent } from '../layouts';
import {
  MaterialsService,
  OrdersService,
  SculpturesService,
} from '../../services';
import {
  MaterialsInfo,
  Order,
  AppRoutes,
  Material,
  Sculpture,
} from '../../types';
import { RedirectWarningComponent } from '../../components/redirect-warning/redirect-warning.component';

@Component({
  selector: 'app-order-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ItemDetailsLayoutComponent,
    OrderFormComponent,
    RedirectWarningComponent,
  ],
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss'],
})
export class OrderDetailsPageComponent implements OnInit {
  materialsInfo: MaterialsInfo;
  order$?: Observable<Order | undefined>;
  nextOrderRoute$?: Observable<string | undefined>;
  previousOrderRoute$?: Observable<string | undefined>;
  routerSubscription?: Subscription;
  backRoute = AppRoutes.Orders;
  materials: Material[];
  sculptures: Sculpture[];
  dataSaved: boolean = true;
  warningOpen: boolean = false;
  redirectUrl: string | undefined;

  constructor(
    private materialService: MaterialsService,
    private sculptureService: SculpturesService,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.materials = materialService.getMaterials();
    this.materialsInfo = materialService.getMaterialsInfo();
    this.sculptures = this.sculptureService.getAllSculptures();
    this.ordersService = ordersService;
  }

  ngOnInit(): void {
    this.materialsInfo = this.materialService.getMaterialsInfo();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.dataSaved = true;
        this.warningOpen = false;
      }
    });

    this.order$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const routeId = paramMap.get('id');
        if (routeId == null) return of(undefined);

        const order = this.ordersService.getOrder(routeId);
        return of(order);
      })
    );

    this.previousOrderRoute$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const routeId = paramMap.get('id');
        if (routeId == null) return of(undefined);

        const previousOrder = this.ordersService.getPreviousOrder(routeId);
        return of(
          previousOrder ? `${AppRoutes.Orders}/${previousOrder.id}` : undefined
        );
      })
    );

    this.nextOrderRoute$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const routeId = paramMap.get('id');
        if (routeId == null) return of(undefined);

        const nextOrder = this.ordersService.getNextOrder(routeId);
        return of(
          nextOrder ? `${AppRoutes.Orders}/${nextOrder.id}` : undefined
        );
      })
    );
  }

  cancel(): void {
    this.router.navigate([AppRoutes.Orders]);
  }

  setFormDirty(dirty: boolean): void {    
    this.dataSaved = !dirty;
  }

  createOrder(order: Order): void {
    this.dataSaved = true;
    this.ordersService.upsertOrder(order);
    this.router.navigate([AppRoutes.Orders]);
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

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}
