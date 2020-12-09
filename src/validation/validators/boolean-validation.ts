import { InvalidParamError } from '@presentation/errors'
import { Validation } from '@presentation/protocols'

export class BooleanValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: object): Error | null {
    const value = input[this.fieldName]
    const regex = /(true|false|'true'|'false')/g
    if (!regex.test(value)) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
