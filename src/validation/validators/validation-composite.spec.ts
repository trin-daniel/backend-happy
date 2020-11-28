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
})
