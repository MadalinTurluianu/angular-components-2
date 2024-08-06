import { ConfiguredSculpture, MaterialsInfo } from '../types';

export function calculateConfiguredSculptureWeight(
  configuredSculpture: ConfiguredSculpture,
  materialsInfo: MaterialsInfo
): number {
  const baseWeight = configuredSculpture.sculpture.baseWeight;
  const weightMultiplier =
    materialsInfo[configuredSculpture.material].weightMultiplier;
  return baseWeight * weightMultiplier;
}
