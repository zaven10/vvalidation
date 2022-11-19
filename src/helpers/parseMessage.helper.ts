import { ValidationRule } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'

import { TMessage } from '../types'

import { IOptions } from '../interfaces'

export function parseMessageHelper(
  validator: ValidationRule,
  options?: IOptions,
): ValidationRule {
  if (!options?.message) {
    return validator
  }

  const message: TMessage =
    options?.message instanceof Function
      ? options?.message
      : (options?.message as string)

  return helpers.withMessage(message, validator)
}
