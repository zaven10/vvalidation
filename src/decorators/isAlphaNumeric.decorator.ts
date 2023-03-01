import { ValidationRule } from '@vuelidate/core'
import { alphaNum } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function isAlphaNumericDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = parseMessage(alphaNum, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.ALPHA_NUM

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
