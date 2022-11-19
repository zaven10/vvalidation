import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { maxLength } from '@vuelidate/validators'

import { Validators } from '../enums'

import { TMax } from '../types'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function maxLengthDecorator(max: TMax, options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{ max: number }> =
      maxLength(max)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MAX_LENGTH

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
