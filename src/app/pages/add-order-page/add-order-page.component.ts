import { Component } from '@angular/core';
import { OrderFormComponent } from '../../components';
import {
  AppRoutes,
  Material,
  MaterialsInfo,
  Order,
  Sculpture,
} from '../../types';
import {
  MaterialsService,
  OrdersService,
  SculpturesService,
} from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order-page',
  standalone: true,
  imports: [OrderFormComponent],
  templateUrl: './add-order-page.component.html',
  styleUrl: './add-order-page.component.scss',
})
export class AddOrderPageComponent {
  sculptures: Sculpture[] = [];
  materials: Material[] = [];
  materialsInfo: MaterialsInfo;
  ordersService: OrdersService;
  router: Router;

  constructor(
    materialService: MaterialsService,
    sculptureService: SculpturesService,
    ordersService: OrdersService,
    router: Router
  ) {
    this.materials = materialService.getMaterials();
    this.materialsInfo = materialService.getMaterialsInfo();
    this.sculptures = sculptureService.getAllSculptures();
    this.ordersService = ordersService;
    this.router = router;
  }

  cancelHandler() {
    console.log('cancel');

    this.router.navigate([AppRoutes.Orders]);
  }

  onCreateOrder(order: Order) {
    this.ordersService.addOrder(order);
  }
}
