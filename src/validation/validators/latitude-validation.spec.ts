import { InvalidParamError } from '@presentation/errors'
import { CoordinateValidator } from '@validation/protocols/coordinate-validator'
import { LatitudeValidation } from '@validation/validators/latitude-validation'
import { address } from 'faker/locale/pt_BR'

const mockCoordinateValidator = (): CoordinateValidator => {
  class CoordinateValidatorSpy implements CoordinateValidator {
    isCoordinate (value: number): boolean {
      return true
    }
  }
  return new CoordinateValidatorSpy()
}

describe('Latitude Validation', () => {
  test('Should be able to return a InvalidParamError if validation fails', () => {
    const coordinateValidatorSpy = mockCoordinateValidator()
    const sut = new LatitudeValidation('field', coordinateValidatorSpy)
    jest.spyOn(coordinateValidatorSpy, 'isCoordinate').mockReturnValueOnce(false)
    const data = { field: Number(address.latitude()) }
    const error = sut.validate(data)
    expect(error).toEqual(new InvalidParamError('field'))
  })
})
