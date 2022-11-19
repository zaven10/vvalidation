import { MessageProps } from '@vuelidate/validators'

export type MessageType = string | ((params: MessageProps) => string)
