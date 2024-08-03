import { Injectable } from '@angular/core';
import { Material, MaterialsInfo } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  constructor() {}

  private materials = [Material.Wood, Material.Bronze, Material.Platinum];

  private materialsInfo: MaterialsInfo = {
    [Material.Wood]: {
      priceMultiplier: 1,
      weightMultiplier: 1,
    },
    [Material.Bronze]: {
      priceMultiplier: 2,
      weightMultiplier: 12.4,
    },
    [Material.Platinum]: {
      priceMultiplier: 18,
      weightMultiplier: 30.3,
    },
  };

  getMaterialsInfo(): MaterialsInfo {
    return this.materialsInfo;
  }

  getMaterials(): Material[] {
    return this.materials;
  }
}
