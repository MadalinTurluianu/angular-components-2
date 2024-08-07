import { Injectable } from '@angular/core';
import { Material, MaterialsInfo } from '../../types';
import { MATERIALS, MATERIALS_INFO } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  private materials: Material[] = MATERIALS;

  private materialsInfo: MaterialsInfo = MATERIALS_INFO;

  getMaterialsInfo(): MaterialsInfo {
    return this.materialsInfo;
  }

  getMaterials(): Material[] {
    return this.materials;
  }
}
