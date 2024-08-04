import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OrderDetailsComponent } from '../../components';
import { ItemDetailsLayoutComponent } from '../layouts';
import { MaterialsService, OrdersService } from '../../services';
import { MaterialsInfo, Order, AppRoutes } from '../../types';

@Component({
  selector: 'app-order-details-page',
  standalone: true,
  imports: [OrderDetailsComponent, CommonModule, ItemDetailsLayoutComponent],
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss'],
})
export class OrderDetailsPageComponent implements OnInit {
  materialsInfo!: MaterialsInfo;
  order$!: Observable<Order | undefined>;
  nextOrderRoute$!: Observable<string | undefined>;
  previousOrderRoute$!: Observable<string | undefined>;
  backRoute = AppRoutes.Orders;

  constructor(
    private materialService: MaterialsService,
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.materialsInfo = this.materialService.getMaterialsInfo();

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
}
