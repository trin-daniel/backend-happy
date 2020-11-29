import { CoordinateValidator } from '@validation/protocols/coordinate-validator'
import validator from 'validator'

export class CoordinateValidatorAdapter implements CoordinateValidator {
  isCoordinate (value: number): boolean {
    const isValid = validator.isLatLong(value.toString())
    return isValid
  }
}
