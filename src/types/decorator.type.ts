import { ValidationRule } from '@vuelidate/core'

export type DecoratorType = (
  target: any,
  propertyKey: string,
  isEmbedded?: boolean,
) => ValidationRule
