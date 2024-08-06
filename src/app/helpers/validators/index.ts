import { noWhitespaceValidator } from './noWhitespaceValidator';
import { noEmptyArray } from './noEmptyArray';
import { ValidatorFn } from '@angular/forms';

export const customValidators = {
  noWhitespace: noWhitespaceValidator,
  noEmptyArray: noEmptyArray,
} satisfies Record<string, ValidatorFn>;
