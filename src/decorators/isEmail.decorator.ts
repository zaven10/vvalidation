import { ValidationRule } from '@vuelidate/core'
import { email } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function isEmailDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = parseMessage(email, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.EMAIL

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
