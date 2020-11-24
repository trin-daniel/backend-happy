import { InvalidParamError } from '@presentation/errors'
import { TimeValidation } from '@validation/validators/time-validation'
import { TimeValidator } from '@validation/protocols/time-validator'
import { time } from 'faker'

const mockTimeValidator = (): TimeValidator => {
  class TimeValidatorSpy implements TimeValidator {
    isTime (value: number): boolean {
      return true
    }
  }
  return new TimeValidatorSpy()
}

describe('Time Validation', () => {
  test('Should be able to return a InvalidParamError if validation fails', () => {
    const timeValidatorSpy = mockTimeValidator()
    const sut = new TimeValidation('field', timeValidatorSpy)
    jest.spyOn(timeValidatorSpy, 'isTime').mockReturnValueOnce(false)
    const error = sut.validate({ field: time.recent() })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should be able to return null if validation is successful', () => {
    const timeValidatorSpy = mockTimeValidator()
    const sut = new TimeValidation('field', timeValidatorSpy)
    const error = sut.validate({ field: time.recent() })
    expect(error).toBeNull()
  })
})
