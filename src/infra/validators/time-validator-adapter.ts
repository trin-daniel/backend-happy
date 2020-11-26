import { TimeValidator } from '@validation/protocols/time-validator'
import { isDate } from 'moment'

export class TimeValidatorAdapter implements TimeValidator {
  isTime (value: number): boolean {
    const date = new Date(value)
    const isTime = isDate(date)
    return isTime
  }
}
