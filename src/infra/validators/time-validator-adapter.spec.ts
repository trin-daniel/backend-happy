import { TimeValidatorAdapter } from '@infra/validators/time-validator-adapter'
import { time } from 'faker'
import moment from 'moment'

jest.mock('moment', () => {
  return {
    isDate (): boolean {
      return true
    }
  }
})

describe('Time Validator Adapter', () => {
  test('Should be able to call the validator with the correct value', () => {
    const sut = new TimeValidatorAdapter()
    const isDate = jest.spyOn(moment, 'isDate')
    const value = time.recent()
    const date = new Date(value)
    sut.isTime(value)
    expect(isDate).toHaveBeenCalledWith(date)
  })
})
