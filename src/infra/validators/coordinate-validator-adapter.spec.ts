import { CoordinateValidatorAdapter } from '@infra/validators/coordinate-validator-adapter'
import { address } from 'faker'
import validator from 'validator'

jest.mock('validator', () => ({
  isLatLong (): boolean {
    return true
  }
}))

type SutTypes = { sut: CoordinateValidatorAdapter }

const makeSut = (): SutTypes => {
  const sut = new CoordinateValidatorAdapter()
  return {
    sut
  }
}

describe('Coordinate Validator Adapter', () => {
  test('Should be able to call the validator with the correct value', () => {
    const { sut } = makeSut()
    const isLatLongSpy = jest.spyOn(validator, 'isLatLong')
    const value = Number(address.latitude())
    sut.isCoordinate(value)
    expect(isLatLongSpy).toHaveBeenCalledWith(String(value))
  })

  test('Should be able to return false if the validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isLatLong').mockReturnValueOnce(false)
    const value = Number(address.latitude())
    const isCoordinate = sut.isCoordinate(value)
    expect(isCoordinate).toBe(false)
  })

  test('Should be able to return true if the validator returns true', () => {
    const { sut } = makeSut()
    const value = Number(address.latitude())
    const isCoordinate = sut.isCoordinate(value)
    expect(isCoordinate).toBe(true)
  })
})
