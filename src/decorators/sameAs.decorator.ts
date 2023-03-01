import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { sameAs } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function sameAsDecorator<E = unknown>(
  equalTo: E,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{
      equalTo: E
      otherName: string
    }> = sameAs(equalTo)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.SAME_AS

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
