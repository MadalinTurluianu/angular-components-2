import { Component } from '@angular/core';
import { OrderFormComponent } from '../../components';
import {
  Material,
  MaterialInfo,
  MaterialsInfo,
  Order,
  Sculpture,
} from '../../types';
import { MaterialsService, SculpturesService } from '../../services';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [OrderFormComponent],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss',
})
export class AddOrderComponent {
  sculptures: Sculpture[] = [];
  materials: Material[] = [];
  materialsInfo: MaterialsInfo;

  constructor(
    private materialService: MaterialsService,
    private sculptureService: SculpturesService
  ) {
    this.materials = this.materialService.getMaterials();
    this.materialsInfo = this.materialService.getMaterialsInfo();
    this.sculptures = this.sculptureService.getAllSculptures();
  }

  onCreateOrder(order: Order) {
    console.log(order);
  }
}
