import { ValidationRule } from '@vuelidate/core'
import { alpha } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function isAlphaDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = parseMessage(alpha, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.ALPHA

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
