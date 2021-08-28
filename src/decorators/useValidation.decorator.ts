import { IUseValidation } from '../interfaces'

import { useValidation } from '../hooks'

export function useValidationDecorator(): any {
  return function (constructor: any): void {
    const _this: any = constructor.prototype

    const { addField, addRule, setDefault, getData }: IUseValidation =
      useValidation()

    _this.addField = addField
    _this.addRule = addRule
    _this.setDefault = setDefault
    _this.getData = getData
  }
}
