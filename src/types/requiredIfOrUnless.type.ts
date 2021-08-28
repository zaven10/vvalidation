export type RequiredIfOrUnlessType =
  | boolean
  | string
  | (() => boolean | Promise<boolean>)
