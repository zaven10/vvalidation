import { ValidationRule } from '@vuelidate/core'
import { not } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { TDecorator } from '../types'

import { parseMessage, voidFunction } from '../helpers'

export function notDecorator(validator: TDecorator, options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRule = not(
      validator(target, propertyKey, true),
    )

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.NOT

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
