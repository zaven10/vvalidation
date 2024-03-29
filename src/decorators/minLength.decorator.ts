import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { minLength } from '@vuelidate/validators'

import { Validators } from '../enums'

import { TMin } from '../types'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function minLengthDecorator(min: TMin, options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{ min: number }> =
      minLength(min)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MIN_LENGTH

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
