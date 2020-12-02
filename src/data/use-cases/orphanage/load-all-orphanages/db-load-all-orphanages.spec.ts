import { DbLoadAllOrphanages } from '@data/use-cases/orphanage/load-all-orphanages/db-load-all-orphanages'
import { LoadAllOrphanagesRepository } from '@data/protocols/load-all-orphanages-repository'
import { Orphanage } from '@domain/models/orphanage'

const mockLoadAllOrphanagesRepository = (): LoadAllOrphanagesRepository => {
  class LoadAllOrphanagesRepositorySpy implements LoadAllOrphanagesRepository {
    async load (): Promise<Orphanage[]> {
      return Promise.resolve(null)
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
})
