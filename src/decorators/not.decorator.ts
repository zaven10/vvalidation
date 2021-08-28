import { ValidationRule } from '@vuelidate/core'
import { helpers, not } from '@vuelidate/validators'

import { Validators } from '../enums'
import { IOptions } from '../interfaces'
import { TDecorator } from '../types'
import { voidFunction } from '../helpers'

export function notDecorator(validator: TDecorator, options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRule = not(
      validator(target, propertyKey, true),
    )

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.NOT

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
