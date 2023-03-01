import { ValidationRule } from '@vuelidate/core'
import { integer } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function isIntegerDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = parseMessage(integer, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.INTEGER

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
