import { CoordinateValidatorAdapter } from '@infra/validators/coordinate-validator-adapter'
import { address } from 'faker'
import validator from 'validator'

jest.mock('validator', () => ({
  isLatLong (): boolean {
    return true
  }
}))

describe('Coordinate Validator Adapter', () => {
  test('Should be able to call the validator with the correct value', () => {
    const sut = new CoordinateValidatorAdapter()
    const isLatLongSpy = jest.spyOn(validator, 'isLatLong')
    const value = Number(address.latitude())
    sut.isCoordinate(value)
    expect(isLatLongSpy).toHaveBeenCalledWith(String(value))
  })
})
