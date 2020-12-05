import { LoadOrphanageController } from '@presentation/controllers/orphanage/load-orphanage/load-orphanage-controller'
import { HttpRequest, LoadOrphanage, Orphanage } from '@presentation/controllers/orphanage/load-orphanage/load-orphanage-controller-protocols'
import { ok, serverError } from '@presentation/helpers/http-helpers'
import { random, internet, address } from 'faker/locale/pt_BR'

const mockOrphanage = {
  id: random.uuid(),
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: '00:38:36',
  closing_time: '14:38:36',
  open_on_weekends: random.boolean()
}

const mockRequest: HttpRequest<any> = {
  params: {
    id: random.uuid()
  },
  body: {}
}

const mockLoadOrphanage = (): LoadOrphanage => {
  class LoadOrphanageSpy implements LoadOrphanage {
    loadById (id: string): Promise<Orphanage> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new LoadOrphanageSpy()
}

type SutTypes = { sut: LoadOrphanageController, loadOrphanageSpy: LoadOrphanage}

const makeSut = (): SutTypes => {
  const loadOrphanageSpy = mockLoadOrphanage()
  const sut = new LoadOrphanageController(loadOrphanageSpy)
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
