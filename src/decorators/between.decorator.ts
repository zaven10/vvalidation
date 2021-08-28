import { helpers, between } from '@vuelidate/validators'
import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'

import { Validators } from '../enums'
import { TMax, TMin } from '../types'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function betweenDecorator(
  min: TMin,
  max: TMax,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{
      min: number
      max: number
    }> = between(min, max)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.BETWEEN

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
