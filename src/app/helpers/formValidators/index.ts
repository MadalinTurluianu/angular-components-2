import { noWhitespaceValidator } from './no-whitespace';
import { noEmptyArray } from './no-empty-arrays';
import { ValidatorFn } from '@angular/forms';

export const formValidators = {
  noWhitespace: noWhitespaceValidator,
  noEmptyArray: noEmptyArray,
} satisfies Record<string, ValidatorFn>;
