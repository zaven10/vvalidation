import { ValidationRule, ValidationRuleWithoutParams } from '@vuelidate/core'
import { helpers, requiredIf } from '@vuelidate/validators'

import { Validators } from '../enums'
import { TRequiredIfOrUnless } from '../types'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function requiredIfDecorator(
  prop: TRequiredIfOrUnless,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithoutParams = requiredIf(prop)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.REQUIRED_IF

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
