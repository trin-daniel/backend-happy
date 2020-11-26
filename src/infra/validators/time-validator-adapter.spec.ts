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

  test('Should be able to return false if the validator returns false', () => {
    const sut = new TimeValidatorAdapter()
    jest.spyOn(moment, 'isDate').mockReturnValueOnce(false)
    const value = time.recent()
    const isTime = sut.isTime(value)
    expect(isTime).toBe(false)
  })

  test('Should be able to return true if the validator returns true', () => {
    const sut = new TimeValidatorAdapter()
    const value = time.recent()
    const isTime = sut.isTime(value)
    expect(isTime).toBe(true)
  })
})
