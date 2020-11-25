import { InvalidParamError } from '@presentation/errors'
import { BooleanValidation } from '@validation/validators/boolean-validation'
import { random } from 'faker'

describe('Boolean Validation', () => {
  test('Should be able to return a InvalidParamError if validation fails', () => {
    const sut = new BooleanValidation('field')
    const error = sut.validate({ field: random.word() })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should be able to return null if validation is successful', () => {
    const sut = new BooleanValidation('field')
    const error = sut.validate({ field: random.boolean() })
    expect(error).toBeNull()
  })
})
