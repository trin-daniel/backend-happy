import { InvalidParamError } from '@presentation/errors'
import { DateValidation } from '@validation/validators/date-validation'
import { DateValidator } from '@validation/protocols/date-validator'
import { time } from 'faker'

const mockDateValidator = (): DateValidator => {
  class DateValidatorSpy implements DateValidator {
    isDate (value: string): boolean {
      return true
    }
  }
  return new DateValidatorSpy()
}

type SutTypes = { sut: DateValidation, dateValidatorSpy: DateValidator}

const makeSut = (): SutTypes => {
  const dateValidatorSpy = mockDateValidator()
  const sut = new DateValidation('field', dateValidatorSpy)
  return {
    sut,
    dateValidatorSpy
  }
}

describe('Date Validation', () => {
  test('Should be able to return a InvalidParamError if validation fails', () => {
    const { sut, dateValidatorSpy } = makeSut()
    jest.spyOn(dateValidatorSpy, 'isDate').mockReturnValueOnce(false)
    const error = sut.validate({ field: time.recent() })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should be able to return null if validation is successful', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: time.recent() })
    expect(error).toBeNull()
  })
})
