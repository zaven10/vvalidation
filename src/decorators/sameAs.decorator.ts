import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { helpers, sameAs } from '@vuelidate/validators'

import { Validators } from '../enums'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function sameAsDecorator<E = unknown>(
  equalTo: E,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{
      equalTo: E
      otherName: string
    }> = sameAs(equalTo)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.SAME_AS

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
