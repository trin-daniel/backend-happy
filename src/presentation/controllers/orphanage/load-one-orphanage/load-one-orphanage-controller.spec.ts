import { LoadOneOrphanageController } from '@presentation/controllers/orphanage/load-one-orphanage/load-one-orphanage-controller'
import { HttpRequest, LoadOneOrphanage, Orphanage, Image } from '@presentation/controllers/orphanage/load-one-orphanage/load-one-orphanage-controller-protocols'
import { ok, serverError } from '@presentation/helpers/http-helpers'
import { random, internet, address, system } from 'faker/locale/pt_BR'

const photo = (): Image => ({ id: random.uuid(), filename: system.fileName(), path: system.filePath(), destination: system.directoryPath(), mimetype: system.mimeType(), size: 256 })
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
  photos: [photo()]
}

const mockRequest: HttpRequest<any> = {
  params: {
    id: random.uuid()
  },
  body: {}
}

const mockLoadOrphanage = (): LoadOneOrphanage => {
  class LoadOrphanageSpy implements LoadOneOrphanage {
    loadById (id: string): Promise<Orphanage> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new LoadOrphanageSpy()
}

type SutTypes = { sut: LoadOneOrphanageController, loadOrphanageSpy: LoadOneOrphanage}

const makeSut = (): SutTypes => {
  const loadOrphanageSpy = mockLoadOrphanage()
  const sut = new LoadOneOrphanageController(loadOrphanageSpy)
  return {
    sut,
    loadOrphanageSpy
  }
}

describe('Load Orphanage Controller', () => {
  test('Should be able to call LoadOrphanage with the correct value', async () => {
    const { sut, loadOrphanageSpy } = makeSut()
    const loadById = jest.spyOn(loadOrphanageSpy, 'loadById')
    const request = mockRequest
    await sut.handle(request)
    expect(loadById).toHaveBeenCalledWith(request.params.id)
  })

  test('Should be able to return an orphanage if successful', async () => {
    const { sut } = makeSut()
    const request = mockRequest
    const response = await sut.handle(request)
    expect(response).toEqual(ok(mockOrphanage))
  })

  test('Should be able to return an error of type 500 if LoadOrphanage fails', async () => {
    const { sut, loadOrphanageSpy } = makeSut()
    jest.spyOn(loadOrphanageSpy, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const request = mockRequest
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })
})
