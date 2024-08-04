import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';
import { MaterialsInfo, Order } from '../../types';
import { MaterialsService, OrdersService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details-page',
  standalone: true,
  imports: [LayoutComponent, OrderDetailsComponent, CommonModule],
  templateUrl: './order-details-page.component.html',
  styleUrl: './order-details-page.component.scss',
})
export class OrderDetailsPageComponent {
  materialsInfo!: MaterialsInfo;
  order: Order | null = null;

  constructor(
    materialService: MaterialsService,
    ordersService: OrdersService,
    route: ActivatedRoute
  ) {
    this.materialsInfo = materialService.getMaterialsInfo();
    const routeId = route.snapshot.paramMap.get('id');
    if (!routeId) return;

    this.order = ordersService.getOrder(routeId);
  }
}
