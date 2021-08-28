import { ValidationRule } from '@vuelidate/core'
import { helpers, email } from '@vuelidate/validators'

import { Validators } from '../enums'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function isEmailDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, email)
      : email

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.EMAIL

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
