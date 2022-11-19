import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { minValue } from '@vuelidate/validators'

import { Validators } from '../enums'

import { TMinOrMaxValue } from '../types'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function minValueDecorator(
  min: TMinOrMaxValue,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{ min: number }> =
      minValue(min)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MIN_VALUE

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
