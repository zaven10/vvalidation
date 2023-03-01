import { and } from '@vuelidate/validators'
import { ValidationRule, ValidationRuleWithoutParams } from '@vuelidate/core'

import { IOptionsWithAsync } from '../interfaces'

import { Validators } from '../enums'

import { TDecorator } from '../types'

import { parseMessage, parseValidator, voidFunction } from '../helpers'

export function andDecorator(
  validators: TDecorator[],
  options?: IOptionsWithAsync,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validatorsData: ValidationRule[] = await Promise.all(
      validators.map(parseValidator(target, propertyKey, options)),
    )

    const validationRule: ValidationRuleWithoutParams = and(...validatorsData)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.AND

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
