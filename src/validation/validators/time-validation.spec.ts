import { InvalidParamError } from '@presentation/errors'
import { TimeValidation } from '@validation/validators/time-validation'
import { TimeValidator } from '@validation/protocols/time-validator'
import { time } from 'faker'

const mockTimeValidator = (): TimeValidator => {
  class TimeValidatorSpy implements TimeValidator {
    isTime (value: string): boolean {
      return true
    }
  }
  return new TimeValidatorSpy()
}

type SutTypes = { sut: TimeValidation, timeValidatorSpy: TimeValidator}

const makeSut = (): SutTypes => {
  const timeValidatorSpy = mockTimeValidator()
  const sut = new TimeValidation('field', timeValidatorSpy)
  return {
    sut,
    timeValidatorSpy
  }
}

describe('Time Validation', () => {
  test('Should be able to return a InvalidParamError if validation fails', () => {
    const { sut, timeValidatorSpy } = makeSut()
    jest.spyOn(timeValidatorSpy, 'isTime').mockReturnValueOnce(false)
    const error = sut.validate({ field: time.recent() })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should be able to return null if validation is successful', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: time.recent() })
    expect(error).toBeNull()
  })
})
