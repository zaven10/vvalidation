import { IValidationData } from '../interfaces'

export interface IUseValidation {
  addField(property: string): void
  addRule(property: string, ruleName: string, rule: any): void
  setDefault(property: string, value: any): void
  getData(): IValidationData
}
