import { InvalidParamError } from '@presentation/errors'
import { Validation } from '@presentation/protocols'
import { CoordinateValidator } from '@validation/protocols/coordinate-validator'

export class LongitudeValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly coordinateValidator: CoordinateValidator
  ) {}

  validate (input: object): Error | null {
    const isCoordinate = this.coordinateValidator.isCoordinate(input[this.fieldName])
    if (!isCoordinate) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
