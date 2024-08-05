import { Material } from './material';
import { Sculpture } from './sculpture';

export type ConfiguredSculpture = {
  sculpture: Sculpture;
  material: Material;
};

export type ConfiguredSculptureDetails = ConfiguredSculpture & {
  price: number;
  weight: number;
};
