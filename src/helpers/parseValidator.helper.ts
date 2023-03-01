import { ValidationRule } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'

import { TDecorator } from '../types'

import { IOptionsWithAsync } from '../interfaces'

export function parseValidatorHelper(
  target: any,
  propertyKey: string,
  options?: IOptionsWithAsync,
): any {
  return async (validator: TDecorator): Promise<ValidationRule> => {
    const calledValidator: ValidationRule = await validator(
      target,
      propertyKey,
      true,
    )

    return options?.withAsync
      ? helpers.withAsync(calledValidator)
      : calledValidator
  }
}
