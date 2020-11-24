import { MissingParamError } from '@presentation/errors'
import { random } from 'faker/locale/pt_BR'
import { RequiredFieldValidation } from '@validation/validators/required-field-validation'

describe('Required Field Validation', () => {
  test('Should be able to return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ invalid_field: random.word() })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
