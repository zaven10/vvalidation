import { ValidationRule, ValidationRuleWithoutParams } from '@vuelidate/core'
import { or } from '@vuelidate/validators'

import { Validators } from '../enums'

import { TDecorator } from '../types'

import { IOptionsWithAsync } from '../interfaces'

import { parseMessage, parseValidator, voidFunction } from '../helpers'

export function orDecorator(
  validators: Array<TDecorator>,
  options?: IOptionsWithAsync,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validatorsData: ValidationRule[] = validators.map(
      parseValidator(target, propertyKey, options),
    )
    const validationRule: ValidationRuleWithoutParams = or(...validatorsData)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.OR

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
