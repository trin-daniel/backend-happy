import { DateValidator } from '@validation/protocols/date-validator'
import { isDate } from 'moment'

export class DateValidatorAdapter implements DateValidator {
  isDate (value: number): boolean {
    const date = new Date(value)
    return isDate(date)
  }
}
