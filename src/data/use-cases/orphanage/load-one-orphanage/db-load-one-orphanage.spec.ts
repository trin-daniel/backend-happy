import { DbLoadOneOrphanage } from '@data/use-cases/orphanage/load-one-orphanage/db-load-one-orphanage'
import { LoadOneOrphanageRepository, Orphanage, Image } from '@data/use-cases/orphanage/load-one-orphanage/db-load-one-orphanage-protocols'
import { random, internet, address, system } from 'faker/locale/pt_BR'

const photo = (): Image => ({ id: random.uuid(), filename: system.fileName(), path: system.filePath(), destination: system.directoryPath(), mimetype: system.mimeType(), size: 256 })
const mockOrphanage: Orphanage = {
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

const mockLoadOneOrphanageRepository = (): LoadOneOrphanageRepository => {
  class LoadOneOrphanageRepositorySpy implements LoadOneOrphanageRepository {
    async loadOne (id: string): Promise<Orphanage> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new LoadOneOrphanageRepositorySpy()
}

type SutTypes = { sut: DbLoadOneOrphanage, loadOneOrphanageRepositorySpy: LoadOneOrphanageRepository }

const makeSut = (): SutTypes => {
  const loadOneOrphanageRepositorySpy = mockLoadOneOrphanageRepository()
  const sut = new DbLoadOneOrphanage(loadOneOrphanageRepositorySpy)
  return {
    sut,
    loadOneOrphanageRepositorySpy
  }
}

describe('DbLoadOneOrphanage Usecase', () => {
  test('Should be able to call LoadOneOrphanageRepository with the correct value', async () => {
    const { sut, loadOneOrphanageRepositorySpy } = makeSut()
    const loadOneSpy = jest.spyOn(loadOneOrphanageRepositorySpy, 'loadOne')
    const id = random.uuid()
    await sut.loadById(id)
    expect(loadOneSpy).toHaveBeenCalledWith(id)
  })

  test('Should be able to return an orphanage successfully', async () => {
    const { sut } = makeSut()
    const id = random.uuid()
    const orphanage = await sut.loadById(id)
    expect(orphanage).toEqual(mockOrphanage)
  })

  test('Should be able to return null if there are no orphanages with the identifier provided', async () => {
    const { sut, loadOneOrphanageRepositorySpy } = makeSut()
    jest.spyOn(loadOneOrphanageRepositorySpy, 'loadOne').mockReturnValueOnce(Promise.resolve(null))
    const id = random.uuid()
    const orphanage = await sut.loadById(id)
    expect(orphanage).toBeNull()
  })

  test('Should be able to pass the exception on to the caller', async () => {
    const { sut, loadOneOrphanageRepositorySpy } = makeSut()
    jest.spyOn(loadOneOrphanageRepositorySpy, 'loadOne').mockReturnValueOnce(Promise.reject(new Error()))
    const id = random.uuid()
    const promise = sut.loadById(id)
    await expect(promise).rejects.toThrow()
  })
})
