import { ValidationRule, ValidationRuleWithoutParams } from '@vuelidate/core'
import { requiredUnless } from '@vuelidate/validators'

import { Validators } from '../enums'

import { TRequiredIfOrUnless } from '../types'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function requiredUnlessDecorator(
  prop: TRequiredIfOrUnless,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithoutParams = requiredUnless(prop)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.REQUIRED_UNLESS

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
