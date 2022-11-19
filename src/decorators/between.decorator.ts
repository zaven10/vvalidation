import { between } from '@vuelidate/validators'
import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'

import { Validators } from '../enums'

import { TMax, TMin } from '../types'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function betweenDecorator(
  min: TMin,
  max: TMax,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithParams<{
      min: number
      max: number
    }> = between(min, max)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.BETWEEN

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
