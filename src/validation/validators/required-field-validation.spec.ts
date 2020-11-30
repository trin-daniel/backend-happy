import { MissingParamError } from '@presentation/errors'
import { RequiredFieldValidation } from '@validation/validators/required-field-validation'
import { random } from 'faker/locale/pt_BR'

type SutTypes = { sut: RequiredFieldValidation}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('field')
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  test('Should be able to return a MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should be able to return null if validation is successful', () => {
    const { sut } = makeSut()
    const data = { field: random.word() }
    const error = sut.validate(data)
    expect(error).toBeNull()
  })
})
