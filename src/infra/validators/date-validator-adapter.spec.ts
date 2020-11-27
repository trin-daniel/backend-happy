import { DateValidatorAdapter } from '@infra/validators/date-validator-adapter'
import { time } from 'faker'
import moment from 'moment'

jest.mock('moment', () => {
  return {
    isDate (): boolean {
      return true
    }
  }
})

describe('Date Validator Adapter', () => {
  test('Should be able to call the validator with the correct value', () => {
    const sut = new DateValidatorAdapter()
    const isDateSpy = jest.spyOn(moment, 'isDate')
    const value = time.recent()
    const date = new Date(value)
    sut.isDate(value)
    expect(isDateSpy).toHaveBeenCalledWith(date)
  })

  test('Should be able to return false if the validator returns false', () => {
    const sut = new DateValidatorAdapter()
    jest.spyOn(moment, 'isDate').mockReturnValueOnce(false)
    const value = time.recent()
    const isDate = sut.isDate(value)
    expect(isDate).toBe(false)
  })

  test('Should be able to return true if the validator returns true', () => {
    const sut = new DateValidatorAdapter()
    const value = time.recent()
    const isDate = sut.isDate(value)
    expect(isDate).toBe(true)
  })
})
