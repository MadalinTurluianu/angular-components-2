import { ConfiguredSculpture, MaterialsInfo } from '../types';

export function calculateConfiguredSculpturePrice(
  configuredSculpture: ConfiguredSculpture,
  materialsInfo: MaterialsInfo
): number {
  const basePrice = configuredSculpture.sculpture.basePrice;
  const priceMultiplier =
    materialsInfo[configuredSculpture.material].priceMultiplier;
  return basePrice * priceMultiplier;
}
