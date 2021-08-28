import { ValidationRule } from '@vuelidate/core'
import { helpers, integer } from '@vuelidate/validators'

import { Validators } from '../enums'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function isIntegerDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, integer)
      : integer

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.INTEGER

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
