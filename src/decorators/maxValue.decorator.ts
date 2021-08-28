import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { helpers, maxValue } from '@vuelidate/validators'

import { Validators } from '../enums'
import { TMinOrMaxValue } from '../types'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function maxValueDecorator(
  max: TMinOrMaxValue,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{ max: number }> =
      maxValue(max)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MAX_VALUE

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
