import { IBaseValidation } from '../interfaces'

export abstract class BaseValidation implements IBaseValidation {
  public getData(): any {
    throw new Error('Method not implemented.')
  }

  private setDefault(): any {
    throw new Error('Method not implemented.')
  }

  private addRule(): any {
    throw new Error('Method not implemented.')
  }

  private addField(): any {
    throw new Error('Method not implemented.')
  }
}
