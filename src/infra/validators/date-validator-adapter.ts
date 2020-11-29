import { DateValidator } from '@validation/protocols/date-validator'

export class DateValidatorAdapter implements DateValidator {
  isDate (value: number): boolean {
    const regex = /^[0-9]{9,}$/g
    const date = regex.test(value.toString())
    return date
  }
}
