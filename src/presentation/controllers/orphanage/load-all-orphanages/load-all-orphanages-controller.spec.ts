import { Orphanage } from '@domain/models/orphanage'
import { LoadAllOrphanages } from '@domain/use-cases/orphanage/load-all-orphanages'
import { LoadAllOrphanagesController } from '@presentation/controllers/orphanage/load-all-orphanages/load-all-orphanages-controller'
import { ok, serverError } from '@presentation/helpers/http-helpers'
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

type SutTypes = { sut: LoadAllOrphanagesController, loadAllOrphanagesSpy: LoadAllOrphanages }

const makeSut = (): SutTypes => {
  const loadAllOrphanagesSpy = mockLoadAllOrphanages()
  const sut = new LoadAllOrphanagesController(loadAllOrphanagesSpy)
  return {
    sut,
    loadAllOrphanagesSpy
  }
}

describe('Load All Ophanages Controller', () => {
  test('Should be able to call LoadAllOrphanages', async () => {
    const { sut, loadAllOrphanagesSpy } = makeSut()
    const loadAllSpy = jest.spyOn(loadAllOrphanagesSpy, 'loadAll')
    await sut.handle()
    expect(loadAllSpy).toHaveBeenCalled()
  })
  test('Should be able to return a list of orphanages if successful', async () => {
    const { sut } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(ok(mockOrphanage))
  })

  test('Should be able to return an error of type 500 if LoadAllOrphanages fails', async () => {
    const { sut, loadAllOrphanagesSpy } = makeSut()
    jest.spyOn(loadAllOrphanagesSpy, 'loadAll').mockReturnValueOnce(Promise.reject(serverError(new Error())))
    const response = await sut.handle()
    expect(response).toEqual(serverError(new Error()))
  })
})
