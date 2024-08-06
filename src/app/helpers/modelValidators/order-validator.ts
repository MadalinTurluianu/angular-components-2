import { Order } from '../../types';

export function orderValidator(order: Order): boolean {
  if (typeof order.buyerName !== 'string') return false;
  if (typeof order.buyerDeliveryAddress !== 'string') return false;
  if (typeof order.id !== 'string') return false;
  if (typeof order.totalPrice !== 'number') return false;
  if (typeof order.totalWeight !== 'number') return false;
  if (!Array.isArray(order.configuredSculptures)) return false;
  if (order.configuredSculptures.length < 1) return false;

  return true;
}
