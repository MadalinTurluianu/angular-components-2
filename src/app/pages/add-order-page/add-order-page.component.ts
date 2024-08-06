import { Component } from '@angular/core';
import { OrderFormComponent, RedirectWarningComponent } from '../../components';
import {
  AppRoutes,
  Material,
  MaterialsInfo,
  Order,
  Sculpture,
} from '../../types';
import {
  CanComponentDeactivate,
  MaterialsService,
  OrdersService,
  SculpturesService,
} from '../../services';
import { Router } from '@angular/router';
import { BaseLayoutComponent } from '../layouts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-order-page',
  standalone: true,
  imports: [
    OrderFormComponent,
    BaseLayoutComponent,
    RedirectWarningComponent,
    CommonModule,
  ],
  templateUrl: './add-order-page.component.html',
  styleUrl: './add-order-page.component.scss',
})
export class AddOrderPageComponent implements CanComponentDeactivate {
  sculptures: Sculpture[] = [];
  materials: Material[] = [];
  materialsInfo: MaterialsInfo;
  dataSaved: boolean = false;
  warningOpen: boolean = false;
  redirectUrl: string | undefined;

  constructor(
    materialService: MaterialsService,
    sculptureService: SculpturesService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.materials = materialService.getMaterials();
    this.materialsInfo = materialService.getMaterialsInfo();
    this.sculptures = sculptureService.getAllSculptures();
  }

  cancel(): void {
    this.router.navigate([AppRoutes.Orders]);
  }

  createOrder(order: Order): void {
    this.ordersService.upsertOrder(order);
    this.dataSaved = true;
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
}
