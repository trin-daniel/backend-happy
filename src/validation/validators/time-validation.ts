import { InvalidParamError } from '@presentation/errors'
import { Validation } from '@presentation/protocols'
import { TimeValidator } from '@validation/protocols/time-validator'

export class TimeValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly timeValidator: TimeValidator
  ) {}

  validate (input: object): Error | null {
    const isTime = this.timeValidator.isTime(input[this.fieldName])
    if (!isTime) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
