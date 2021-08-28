import { ValidationRule, ValidationRuleWithoutParams } from '@vuelidate/core'
import { helpers, macAddress } from '@vuelidate/validators'

import { Validators } from '../enums'
import { TSeparator } from '../types'
import { IOptions } from '../interfaces'
import { voidFunction } from '../helpers'

export function isMacAddressDecorator(
  separator: TSeparator,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbeded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    const validationRule: ValidationRuleWithoutParams = macAddress(separator)

    const rule: ValidationRule = options?.message
      ? helpers.withMessage(options.message, validationRule)
      : validationRule

    if (isEmbeded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.MAC_ADDRESS

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
