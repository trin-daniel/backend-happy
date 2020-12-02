import { DbLoadAllOrphanages } from '@data/use-cases/orphanage/load-all-orphanages/db-load-all-orphanages'
import { LoadAllOrphanagesRepository } from '@data/protocols/load-all-orphanages-repository'
import { Orphanage } from '@domain/models/orphanage'
import { internet, random, time, address } from 'faker/locale/pt_BR'

const mockOrphanage: Orphanage[] = [{
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

const mockLoadAllOrphanagesRepository = (): LoadAllOrphanagesRepository => {
  class LoadAllOrphanagesRepositorySpy implements LoadAllOrphanagesRepository {
    async load (): Promise<Orphanage[]> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new LoadAllOrphanagesRepositorySpy()
}

describe('DbLoadAllOrphanages Usecase', () => {
  test('Should be able to call LoadAllOrphanagesRepository', async () => {
    const loadAllOrphanagesRepositorySpy = mockLoadAllOrphanagesRepository()
    const sut = new DbLoadAllOrphanages(loadAllOrphanagesRepositorySpy)
    const loadSpy = jest.spyOn(loadAllOrphanagesRepositorySpy, 'load')
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should be able to return a list of orphanages if successful', async () => {
    const loadAllOrphanagesRepositorySpy = mockLoadAllOrphanagesRepository()
    const sut = new DbLoadAllOrphanages(loadAllOrphanagesRepositorySpy)
    const orphanages = await sut.loadAll()
    expect(orphanages).toEqual(mockOrphanage)
  })
})
