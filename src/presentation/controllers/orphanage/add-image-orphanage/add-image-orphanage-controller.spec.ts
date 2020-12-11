import { AddImageOrphanageController } from '@presentation/controllers/orphanage/add-image-orphanage/add-image-orphanage-controller'
import { HttpRequest } from '@presentation/protocols'
import { notFound } from '@presentation/helpers/http-helpers'
import { InvalidRouteParamError } from '@presentation/errors'
import { Image, Orphanage } from '@domain/models/orphanage'
import { LoadOneOrphanage } from '@domain/use-cases/orphanage/load-one-orphanage'
import { random, system, internet, address } from 'faker/locale/pt_BR'
import { AddImageOrphanage } from '@domain/use-cases/orphanage/add-image-orphanage'

const photo = (): Image => ({ id: random.uuid(), filename: system.fileName(), path: system.filePath(), destination: system.directoryPath(), mimetype: system.mimeType(), size: 256 })
const mockRequest: HttpRequest<any> = {
  body: {},
  params: {
    orphanage_id: random.uuid()
  },
  files: [photo(), photo()]
}

const mockOrphanage = {
  id: random.uuid(),
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: '00:38:36',
  closing_time: '14:38:36',
  open_on_weekends: random.boolean(),
  photos: [photo(), photo()]
}

const mockLoadOneOrphanage = (): LoadOneOrphanage => {
  class LoadOneOrphanageSpy implements LoadOneOrphanage {
    async loadById (id: string): Promise<Orphanage> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new LoadOneOrphanageSpy()
}

const mockAddImageOrphanageSpy = (): AddImageOrphanage => {
  class AddImageOrphanageSpy implements AddImageOrphanage {
    async add (files?: Image[]): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddImageOrphanageSpy()
}

type SutTypes = { sut: AddImageOrphanageController, loadOneOrphanageSpy: LoadOneOrphanage, addImageOrphanageSpy: AddImageOrphanage }

const makeSut = (): SutTypes => {
  const addImageOrphanageSpy = mockAddImageOrphanageSpy()
  const loadOneOrphanageSpy = mockLoadOneOrphanage()
  const sut = new AddImageOrphanageController(loadOneOrphanageSpy, addImageOrphanageSpy)
  return {
    sut,
    loadOneOrphanageSpy,
    addImageOrphanageSpy
  }
}

describe('Add Image Orphanage Controller', () => {
  test('Should be able to call LoadOneOrphanage with correct value', async () => {
    const { sut, loadOneOrphanageSpy } = makeSut()
    const loadById = jest.spyOn(loadOneOrphanageSpy, 'loadById')
    const request = mockRequest
    await sut.handle(request)
    expect(loadById).toHaveBeenCalledWith(request.params.orphanage_id)
  })

  test('Should be able to return a 404 error if there are no orphanages with the given id', async () => {
    const { sut, loadOneOrphanageSpy } = makeSut()
    jest.spyOn(loadOneOrphanageSpy, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const request = mockRequest
    const response = await sut.handle(request)
    expect(response).toEqual(notFound(new InvalidRouteParamError('orphanage_id')))
  })

  test('Should be able to call AddImageOrphanage with correct values', async () => {
    const { sut, addImageOrphanageSpy } = makeSut()
    const loadById = jest.spyOn(addImageOrphanageSpy, 'add')
    const request = mockRequest
    await sut.handle(request)
    expect(loadById).toHaveBeenCalledWith(request.files, request.params.orphanage_id)
  })
})
