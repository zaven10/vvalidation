import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { maxValue } from '@vuelidate/validators'

import { Validators } from '../enums'

import { TMinOrMaxValue } from '../types'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function maxValueDecorator(
  max: TMinOrMaxValue,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{ max: number }> =
      maxValue(max)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MAX_VALUE

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
