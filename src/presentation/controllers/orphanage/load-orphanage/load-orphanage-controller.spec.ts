import { Orphanage } from '@domain/models/orphanage'
import { LoadOrphanage } from '@domain/use-cases/orphanage/load-orphanage'
import { LoadOrphanageController } from '@presentation/controllers/orphanage/load-orphanage/load-orphanage-controller'
import { ok } from '@presentation/helpers/http-helpers'
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

const mockRequest = {
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
describe('Load Orphanage Controller', () => {
  test('Should be able to call LoadOrphanage with the correct value', async () => {
    const loadOrphanageSpy = mockLoadOrphanage()
    const sut = new LoadOrphanageController(loadOrphanageSpy)
    const loadById = jest.spyOn(loadOrphanageSpy, 'loadById')
    const request = mockRequest
    await sut.handle(request)
    expect(loadById).toHaveBeenCalledWith(request.params.id)
  })

  test('Should be able to return an orphanage if successful', async () => {
    const loadOrphanageSpy = mockLoadOrphanage()
    const sut = new LoadOrphanageController(loadOrphanageSpy)
    const request = mockRequest
    const response = await sut.handle(request)
    expect(response).toEqual(ok(mockOrphanage))
  })
})
