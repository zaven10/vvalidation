import { IOptions } from './IOptions.interface'

export interface IOptionalOptions extends Omit<IOptions, 'message'> {}
