import { Validation } from '@presentation/protocols'
import { CoordinateValidatorAdapter } from '@infra/validators/coordinate-validator-adapter'
import { DateValidatorAdapter } from '@infra/validators/date-validator-adapter'
import { ValidationComposite, BooleanValidation, CoordinateValidation, DateValidation, RequiredFieldValidation } from '@validation/validators'

export const makeAddOrphanageValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'latitude', 'longitude', 'about', 'instructions', 'opening_hours', 'closing_time', 'open_on_weekends']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CoordinateValidation('latitude', new CoordinateValidatorAdapter()))
  validations.push(new CoordinateValidation('longitude', new CoordinateValidatorAdapter()))
  validations.push(new DateValidation('opening_hours', new DateValidatorAdapter()))
  validations.push(new DateValidation('closing_time', new DateValidatorAdapter()))
  validations.push(new BooleanValidation('closing_time'))
  return new ValidationComposite(validations)
}
