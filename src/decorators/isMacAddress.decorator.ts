import { ValidationRule, ValidationRuleWithoutParams } from '@vuelidate/core'
import { macAddress } from '@vuelidate/validators'

import { Validators } from '../enums'

import { TSeparator } from '../types'

import { IOptions } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function isMacAddressDecorator(
  separator: TSeparator,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithoutParams = macAddress(separator)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MAC_ADDRESS

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
