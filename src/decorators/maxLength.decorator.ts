import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { helpers, maxLength } from '@vuelidate/validators'

import { Validators } from '../enums'
import { TMax } from '../types'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function maxLengthDecorator(max: TMax, options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{ max: number }> =
      maxLength(max)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MAX_LENGTH

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
