import { ConfiguredSculptureDetails } from '../types';

export function calculateTotalWeight(
  updatedValue: ConfiguredSculptureDetails[]
) {
  return updatedValue.reduce((total, { weight }) => total + weight, 0);
}
