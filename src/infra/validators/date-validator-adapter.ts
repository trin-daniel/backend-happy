import { TimeValidator } from '@validation/protocols/time-validator'

export class TimeValidatorAdapter implements TimeValidator {
  isTime (value: string): boolean {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/g
    const date = regex.test(value)
    return date
  }
}
