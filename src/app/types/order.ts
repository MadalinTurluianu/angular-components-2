import { ConfiguredSculptureDetails } from './configured-sculpture';

export type Order = {
  id: string;
  buyerName: string;
  buyerDeliveryAddress: string;
  configuredSculptures: ConfiguredSculptureDetails[];
  totalWeight: number;
  totalPrice: number;
};
