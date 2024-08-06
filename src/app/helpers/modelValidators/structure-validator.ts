import { Sculpture } from '../../types';

export function sculptureValidator(sculpture: Sculpture): boolean {
  if (typeof sculpture.name !== 'string') return false;
  if (typeof sculpture.id !== 'string') return false;
  if (typeof sculpture.basePrice !== 'number') return false;
  if (typeof sculpture.baseWeight !== 'number') return false;

  return true;
}
