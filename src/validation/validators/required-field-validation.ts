import { MissingParamError } from '@presentation/errors'
import { Validation } from '@presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: object): Error | null {
    const isFilled = input[this.fieldName]
    if (!isFilled) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
