import { helpers, and } from '@vuelidate/validators'
import { ValidationRule, ValidationRuleWithoutParams } from '@vuelidate/core'

import { IOptionsWithAsync } from '../interfaces'

import { Validators } from '../enums'
import { TDecorator } from '../types'
import { parseValidator, voidFunction } from '../helpers'

export function andDecorator(
  validators: Array<TDecorator>,
  options?: IOptionsWithAsync,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validatorsData: ValidationRule[] = validators.map(
      parseValidator(target, propertyKey, options),
    )
    const validationRule: ValidationRuleWithoutParams = and(...validatorsData)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.AND

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
