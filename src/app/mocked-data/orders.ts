import { calculateTotalPrice, calculateTotalWeight } from '../helpers';
import { Order } from '../types';
import { MOCKED_CONFIGURED_SCULPTURES } from './configured-sculptures';

export const MOCKED_ORDERS: Order[] = [
  {
    id: '1',
    buyerName: 'John Doe',
    buyerDeliveryAddress: '123 Main St, Anytown USA',
    totalPrice: calculateTotalPrice(MOCKED_CONFIGURED_SCULPTURES),
    totalWeight: calculateTotalWeight(MOCKED_CONFIGURED_SCULPTURES),
    configuredSculptures: MOCKED_CONFIGURED_SCULPTURES,
  },
  {
    id: '2',
    buyerName: 'Mark Doe',
    buyerDeliveryAddress: '111 Main St, Anytown USA',
    totalPrice: calculateTotalPrice(MOCKED_CONFIGURED_SCULPTURES),
    totalWeight: calculateTotalWeight(MOCKED_CONFIGURED_SCULPTURES),
    configuredSculptures: MOCKED_CONFIGURED_SCULPTURES,
  },
  {
    id: '3',
    buyerName: 'Jane Doe',
    buyerDeliveryAddress: '933 Main St, Anytown USA',
    totalPrice: calculateTotalPrice(MOCKED_CONFIGURED_SCULPTURES),
    totalWeight: calculateTotalWeight(MOCKED_CONFIGURED_SCULPTURES),
    configuredSculptures: MOCKED_CONFIGURED_SCULPTURES,
  },
];
