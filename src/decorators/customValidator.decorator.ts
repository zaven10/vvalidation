import { ValidationRule, ValidatorFn } from '@vuelidate/core'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function customValidatorDecorator(
  validator: ValidatorFn,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = parseMessage(validator, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.CUSTOM

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
