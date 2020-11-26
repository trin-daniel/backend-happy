import { CoordinateValidator } from '@validation/protocols/coordinate-validator'
import validator from 'validator'

export class CoordinateValidatorAdapter implements CoordinateValidator {
  isCoordinate (value: number): boolean {
    const isCoordinate = validator.isLatLong(String(value))
    return isCoordinate
  }
}
