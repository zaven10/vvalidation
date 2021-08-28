import { IUseValidation, IValidationData } from '../interfaces'

export function useValidation(): IUseValidation {
  const rules: any = {}
  const state: any = {}

  const addField = (property: string): void => {
    const value: any = state[property]

    state[property] = value || null
  }

  const addRule = (property: string, ruleName: string, rule: any): void => {
    rules[property] = {
      ...rules[property],
      [ruleName]: rule,
    }
  }

  const setDefault = (property: string, value: any): void => {
    state[property] = value
  }

  const getData = (): IValidationData => ({ rules, state })

  return { addField, addRule, getData, setDefault }
}
