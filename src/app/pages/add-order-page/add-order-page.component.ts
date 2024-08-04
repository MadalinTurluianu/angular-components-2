import { Component } from '@angular/core';
import { OrderFormComponent } from '../../components';
import {
  Material,
  MaterialInfo,
  MaterialsInfo,
  Order,
  Sculpture,
} from '../../types';
import {
  MaterialsService,
  OrdersService,
  SculpturesService,
} from '../../services';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-add-order-page',
  standalone: true,
  imports: [OrderFormComponent, LayoutComponent],
  templateUrl: './add-order-page.component.html',
  styleUrl: './add-order-page.component.scss',
})
export class AddOrderPageComponent {
  sculptures: Sculpture[] = [];
  materials: Material[] = [];
  materialsInfo: MaterialsInfo;

  ordersService: OrdersService;

  constructor(
    materialService: MaterialsService,
    sculptureService: SculpturesService,
    ordersService: OrdersService
  ) {
    this.materials = materialService.getMaterials();
    this.materialsInfo = materialService.getMaterialsInfo();
    this.sculptures = sculptureService.getAllSculptures();
    this.ordersService = ordersService;
  }

  onCreateOrder(order: Order) {
    this.ordersService.addOrder(order);
  }
}
