import { MATERIALS_INFO } from '../constants';
import { ConfiguredSculptureDetails, Material } from '../types';
import { MOCKED_SCULPTURES } from './sculptures';

export const MOCKED_CONFIGURED_SCULPTURES: ConfiguredSculptureDetails[] = [
  {
    material: Material.Platinum,
    sculpture: MOCKED_SCULPTURES[0],
    price:
      MOCKED_SCULPTURES[0].basePrice * MATERIALS_INFO.Platinum.priceMultiplier,
    weight:
      MOCKED_SCULPTURES[0].baseWeight *
      MATERIALS_INFO.Platinum.weightMultiplier,
  },
  {
    material: Material.Bronze,
    sculpture: MOCKED_SCULPTURES[1],
    price:
      MOCKED_SCULPTURES[1].basePrice * MATERIALS_INFO.Bronze.priceMultiplier,
    weight:
      MOCKED_SCULPTURES[1].baseWeight * MATERIALS_INFO.Bronze.weightMultiplier,
  },
  {
    material: Material.Wood,
    sculpture: MOCKED_SCULPTURES[2],
    price: MOCKED_SCULPTURES[2].basePrice * MATERIALS_INFO.Wood.priceMultiplier,
    weight:
      MOCKED_SCULPTURES[2].baseWeight * MATERIALS_INFO.Wood.weightMultiplier,
  },
];
