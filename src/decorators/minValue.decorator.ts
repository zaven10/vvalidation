import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { helpers, minValue } from '@vuelidate/validators'

import { Validators } from '../enums'
import { TMinOrMaxValue } from '../types'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function minValueDecorator(
  min: TMinOrMaxValue,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{ min: number }> =
      minValue(min)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MIN_VALUE

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
