import { Orphanage } from '@domain/models/orphanage'
import { LoadAllOrphanages } from '@domain/use-cases/orphanage/load-all-orphanages'
import { LoadAllOrphanagesController } from '@presentation/controllers/orphanage/load-all-orphanages/load-all-orphanages-controller'
import { internet, random, time, address } from 'faker/locale/pt_BR'

const mockOrphanage = [{
  id: random.uuid(),
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: time.recent(),
  closing_time: time.recent(),
  open_on_weekends: random.boolean()
}]

const mockLoadAllOrphanages = (): LoadAllOrphanages => {
  class LoadAllOrphanagesSpy implements LoadAllOrphanages {
    async loadAll (): Promise<Orphanage[] | null> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new LoadAllOrphanagesSpy()
}

describe('Load All Ophanages Controller', () => {
  test('Should be able to call LoadAllOrphanages', async () => {
    const loadAllOrphanagesSpy = mockLoadAllOrphanages()
    const sut = new LoadAllOrphanagesController(loadAllOrphanagesSpy)
    const loadAllSpy = jest.spyOn(loadAllOrphanagesSpy, 'loadAll')
    await sut.handle()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
