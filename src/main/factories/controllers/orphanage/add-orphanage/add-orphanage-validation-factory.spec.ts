import { Validation } from '@presentation/protocols'
import { CoordinateValidator } from '@validation/protocols/coordinate-validator'
import { ValidationComposite, BooleanValidation, CoordinateValidation, RequiredFieldValidation, TimeValidation } from '@validation/validators'
import { makeAddOrphanageValidationFactory } from '@main/factories/controllers/orphanage/add-orphanage/add-orphanage-validation-factory'
import { TimeValidator } from '@validation/protocols/time-validator'

jest.mock('@validation/validators/validation-composite')

const mockCoordinateValidator = (): CoordinateValidator => {
  class CoordinateValidatorSpy implements CoordinateValidator {
    isCoordinate (value: number): boolean {
      return true
    }
  }
  return new CoordinateValidatorSpy()
}

const mockTimeValidator = (): TimeValidator => {
  class TimeValidatorSpy implements TimeValidator {
    isTime (value: string): boolean {
      return true
    }
  }
  return new TimeValidatorSpy()
}

describe('Add Orphanage Validation Factory', () => {
  test('Should be able to call ValidationComposite with all validations', () => {
    makeAddOrphanageValidationFactory()
    const validations: Validation[] = []
    for (const field of ['name', 'latitude', 'longitude', 'about', 'instructions', 'opening_hours', 'closing_time', 'open_on_weekends']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CoordinateValidation('latitude', mockCoordinateValidator()))
    validations.push(new CoordinateValidation('longitude', mockCoordinateValidator()))
    validations.push(new TimeValidation('opening_hours', mockTimeValidator()))
    validations.push(new TimeValidation('closing_time', mockTimeValidator()))
    validations.push(new BooleanValidation('open_on_weekends'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
