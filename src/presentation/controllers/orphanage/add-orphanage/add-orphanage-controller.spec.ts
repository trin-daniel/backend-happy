import { AddOrphanageController } from './add-orphanage-controller'
import { Validation } from '../../../protocols/validation'
import { badRequest, ok, serverError } from '../../../helpers/http-helpers'
import { Orphanage } from '../../../../domain/models/orphanage'
import { AddOrphanage, AddOrphanageArgs } from '../../../../domain/use-cases/orphanage/add-orphanage'
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

const mockOrphanage = { ...httpRequest.body, id: random.uuid() }

const mockValidation = (): Validation => {
  class ValidationSpy implements Validation {
    validate (input: object): Error | null {
      return null
    }
  }
  return new ValidationSpy()
}

const mockAddOrphanage = (): AddOrphanage => {
  class AddOrphanageSpy implements AddOrphanage {
    async add (data: AddOrphanageArgs): Promise<Orphanage> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new AddOrphanageSpy()
}

type SutTypes = { sut: AddOrphanageController, validationSpy: Validation, addOrphanageSpy: AddOrphanage }

const makeSut = (): SutTypes => {
  const addOrphanageSpy = mockAddOrphanage()
  const validationSpy = mockValidation()
  const sut = new AddOrphanageController(validationSpy, addOrphanageSpy)
  return { sut, validationSpy, addOrphanageSpy }
}

describe('Add Orphanage Controller', () => {
  test('Should be able to call the validation with the correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const request = httpRequest
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should be able to return an error if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())
    const request = httpRequest
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should be able to call AddOrphanage with the correct values', async () => {
    const { sut, addOrphanageSpy } = makeSut()
    const addSpy = jest.spyOn(addOrphanageSpy, 'add')
    const request = httpRequest
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should be able to return a new record if AddOrphanage is successful', async () => {
    const { sut } = makeSut()
    const request = httpRequest
    const response = await sut.handle(request)
    expect(response).toEqual(ok(mockOrphanage))
  })

  test('Should be able to return an error of type 500 if AddOrphanage fails', async () => {
    const { sut, addOrphanageSpy } = makeSut()
    jest.spyOn(addOrphanageSpy, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const request = httpRequest
    const error = await sut.handle(request)
    expect(error).toEqual(serverError(new Error()))
  })
})
