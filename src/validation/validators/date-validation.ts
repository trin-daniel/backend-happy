import { InvalidParamError } from '@presentation/errors'
import { Validation } from '@presentation/protocols'
import { DateValidator } from '@validation/protocols/date-validator'

export class DateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator
  ) {}

  validate (input: object): Error | null {
    const isDate = this.dateValidator.isDate(input[this.fieldName])
    if (!isDate) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
