import { ConfiguredSculptureDetails } from '../types';

export function calculateTotalPrice(
  updatedValue: ConfiguredSculptureDetails[]
) {
  return updatedValue.reduce((total, { price }) => total + price, 0);
}
