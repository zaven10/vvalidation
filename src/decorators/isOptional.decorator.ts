import { Validators } from '../enums'

import { IOptionalOptions } from '../interfaces'

import { voidFunction } from '../helpers'

export function isOptionalDecorator(options?: IOptionalOptions): any {
  return async function (target: any, propertyKey: string): Promise<any> {
    await voidFunction()

    const ruleName: string = options?.name || Validators.OPTIONAL

    target.addField(propertyKey)
    target.addRule(propertyKey, ruleName, voidFunction)
  }
}
