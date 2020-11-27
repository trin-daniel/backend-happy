import { InvalidParamError } from '@presentation/errors'
import { Validation } from '@presentation/protocols'
import { DateValidator } from '@validation/protocols/date-validator'

export class TimeValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly timeValidator: DateValidator
  ) {}

  validate (input: object): Error | null {
    const isDate = this.timeValidator.isDate(input[this.fieldName])
    if (!isDate) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
