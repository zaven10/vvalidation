import { ValidationRule } from '@vuelidate/core'
import { ipAddress } from '@vuelidate/validators'

import { Validators } from '../enums'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function isIpAddressDecorator(options?: IOptions): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const rule: ValidationRule = parseMessage(ipAddress, options)

    if (isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.IP_ADDRESS

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
