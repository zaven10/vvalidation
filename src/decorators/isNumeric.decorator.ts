import { ValidationRule } from '@vuelidate/core'
import { numeric } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function isNumericDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = parseMessage(numeric, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.NUMERIC

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
