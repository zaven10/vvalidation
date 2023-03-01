import { ValidationRule } from '@vuelidate/core'
import { url } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function isUrlDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = parseMessage(url, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.URL

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
