import { voidFunction } from '../helpers'

export function defaultValueDecorator(value: any): any {
  return async function (target: any, propertyKey: string): Promise<void> {
    await voidFunction()

    target.setDefault(propertyKey, value)
  }
}
