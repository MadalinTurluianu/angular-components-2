import { Material, MaterialsInfo } from '../types';

export const MATERIALS: Material[] = [
  Material.Wood,
  Material.Bronze,
  Material.Platinum,
];

export const MATERIALS_INFO: MaterialsInfo = {
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
