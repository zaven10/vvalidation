import { ValidationRule } from '@vuelidate/core'
import { helpers, ipAddress } from '@vuelidate/validators'

import { Validators } from '../enums'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function isIpAddressDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, ipAddress)
      : ipAddress

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.IP_ADDRESS

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
