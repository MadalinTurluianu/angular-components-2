export enum Material {
  Wood = 'Wood',
  Bronze = 'Bronze',
  Platinum = 'Platinum',
}

export type MaterialInfo = {
  priceMultiplier: number;
  weightMultiplier: number;
};

export type MaterialsInfo = Record<Material, MaterialInfo>;
