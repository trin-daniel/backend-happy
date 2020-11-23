import { AddOrphanageController } from './add-orphanage-controller'
import { Validation } from '../../../protocols/validation'
import { address, internet, random } from 'faker/locale/pt_BR'

const httpRequest = {
  body:
   {
     name: internet.userName(),
     latitude: Number(address.latitude()),
     longitude: Number(address.longitude()),
     about: random.words(5),
     instructions: random.words(5),
     opening_hours: new Date(),
     closing_time: new Date(),
     open_on_weekends: random.boolean()
   }
}

const mockValidation = (): Validation => {
  class ValidationSpy implements Validation {
    validate (input: object): Error | null {
      return null
    }
  }
  return new ValidationSpy()
}

type SutTypes = { sut: AddOrphanageController, validationSpy: Validation }

const makeSut = (): SutTypes => {
  const validationSpy = mockValidation()
  const sut = new AddOrphanageController(validationSpy)
  return { sut, validationSpy }
}

describe('Add Orphanage Controller', () => {
  test('Should be able to call the validation with the correct values', () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const request = httpRequest
    sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })
})