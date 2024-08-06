import { orderValidator } from './order-validator';
import { sculptureValidator } from './structure-validator';

export const modelValidators = {
  order: orderValidator,
  sculpture: sculptureValidator,
} satisfies Record<string, (value: any) => boolean>;
