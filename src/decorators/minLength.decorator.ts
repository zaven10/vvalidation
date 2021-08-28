import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { helpers, minLength } from '@vuelidate/validators'

import { Validators } from '../enums'
import { TMin } from '../types'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function minLengthDecorator(length: TMin, options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{ length: number }> =
      minLength(length)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MIN_LENGTH

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
