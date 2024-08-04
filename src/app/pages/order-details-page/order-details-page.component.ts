import { Component } from '@angular/core';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';
import { AppRoutes, MaterialsInfo, Order } from '../../types';
import { MaterialsService, OrdersService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemDetailsLayoutComponent } from '../layouts';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-order-details-page',
  standalone: true,
  imports: [OrderDetailsComponent, CommonModule, ItemDetailsLayoutComponent],
  templateUrl: './order-details-page.component.html',
  styleUrl: './order-details-page.component.scss',
})
export class OrderDetailsPageComponent {
  materialsInfo!: MaterialsInfo;
  order: Order | undefined;
  nextOrderRoute: string | undefined;
  previousOrderRoute: string | undefined;
  backRoute = AppRoutes.Orders;

  constructor(
    private materialService: MaterialsService,
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {
    this.materialsInfo = this.materialService.getMaterialsInfo();

    
     this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          const routeId = paramMap.get('id');
          if (routeId == null) return of(null);

          this.order = this.ordersService.getOrder(routeId);
          if (this.order == null) return of(null);

          const previousOrder = this.ordersService.getPreviousOrder(routeId);
          this.previousOrderRoute = previousOrder ? `${AppRoutes.Orders}/${previousOrder.id}` : undefined;

          const nextOrder = this.ordersService.getNextOrder(routeId);
          this.nextOrderRoute = nextOrder ? `${AppRoutes.Orders}/${nextOrder.id}` : undefined;

          return of(this.order);
        })
      )
      .subscribe();
  }
}
