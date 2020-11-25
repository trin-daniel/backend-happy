import { InvalidParamError } from '@presentation/errors'
import { BooleanValidation } from '@validation/validators/boolean-validation'
import { random } from 'faker'

type SutTypes = { sut: BooleanValidation }

const makeSut = (): SutTypes => {
  const sut = new BooleanValidation('field')
  return {
    sut
  }
}

describe('Boolean Validation', () => {
  test('Should be able to return a InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const data = { field: random.word() }
    const error = sut.validate(data)
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should be able to return null if validation is successful', () => {
    const { sut } = makeSut()
    const data = { field: random.boolean() }
    const error = sut.validate(data)
    expect(error).toBeNull()
  })
})
