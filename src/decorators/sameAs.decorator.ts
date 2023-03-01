import { ValidationRule, ValidationRuleWithParams } from '@vuelidate/core'
import { sameAs } from '@vuelidate/validators'

import { computed } from 'vue'

import { Validators } from '../enums'

import { IOptions, IValidationData } from '../interfaces'

import { parseMessage, voidFunction } from '../helpers'

export function sameAsDecorator<E = unknown>(
  equalTo: E,
  key?: string,
  options?: IOptions,
): any {
  return async function (
    target: any,
    propertyKey: string,
    isEmbedded: boolean = false,
  ): Promise<any> {
    await voidFunction()

    let data: E = equalTo

    if (key) {
      const { state }: IValidationData = await target.getData()

      const _state = await state

      data = computed(() => _state[key]) as E
    }

    const validationRule: ValidationRuleWithParams<{
      equalTo: E
      otherName: string
    }> = sameAs(data as E)

    const rule: ValidationRule = parseMessage(validationRule, options)

    if (await isEmbedded) {
      return rule
    }

    const ruleName: string = options?.name || Validators.SAME_AS

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, rule)
  }
}
