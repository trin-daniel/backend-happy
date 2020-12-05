import { Validation } from '@presentation/protocols'
import { CoordinateValidatorAdapter } from '@infra/validators/coordinate-validator-adapter'
import { TimeValidatorAdapter } from '@infra/validators/date-validator-adapter'
import { ValidationComposite, BooleanValidation, CoordinateValidation, RequiredFieldValidation, TimeValidation } from '@validation/validators'

export const makeAddOrphanageValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'latitude', 'longitude', 'about', 'instructions', 'opening_hours', 'closing_time', 'open_on_weekends']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CoordinateValidation('latitude', new CoordinateValidatorAdapter()))
  validations.push(new CoordinateValidation('longitude', new CoordinateValidatorAdapter()))
  validations.push(new TimeValidation('opening_hours', new TimeValidatorAdapter()))
  validations.push(new TimeValidation('closing_time', new TimeValidatorAdapter()))
  validations.push(new BooleanValidation('open_on_weekends'))
  return new ValidationComposite(validations)
}
