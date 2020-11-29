import { MissingParamError } from '@presentation/errors'
import { Validation } from '@presentation/protocols'
import { ValidationComposite } from '@validation/validators/validation-composite'
import { random } from 'faker/locale/pt_BR'

const mockValidation = (): Validation => {
  class ValidationSpy implements Validation {
    validate (input: object): Error | null {
      return null
    }
  }
  return new ValidationSpy()
}

type SutTypes = { sut: ValidationComposite, validationSpy: Validation[]}

const makeSut = (): SutTypes => {
  const validationSpy = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('Validation Composite', () => {
  test('Should be able to return an error if any validation fails', () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy[0], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({ field: random.word() })
    expect(error).toEqual(new Error())
  })

  test('Should be able to return the first error if more than one occurs', () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationSpy[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: random.word() })
    expect(error).toEqual(new Error())
  })

  test('Should be able to return null on success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: random.word() })
    expect(error).toBeNull()
  })
})
