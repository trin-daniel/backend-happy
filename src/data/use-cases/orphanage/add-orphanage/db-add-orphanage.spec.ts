import { DbAddOrphanage } from '@data/use-cases/orphanage/add-orphanage/db-add-orphanage'
import { AddOrphanageArgs, AddOrphanageRepository, Orphanage } from '@data/use-cases/orphanage/add-orphanage/db-add-orphanage-protocols'
import { random, internet, address } from 'faker/locale/pt_BR'

const orphanageArgs: AddOrphanageArgs = {
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: new Date(),
  closing_time: new Date(),
  open_on_weekends: random.boolean()
}

const mockOrphanage = { ...orphanageArgs, id: random.uuid() }

const mockAddOrphanageRepository = (): AddOrphanageRepository => {
  class AddOrphanageRepositorySpy implements AddOrphanageRepository {
    add (data: AddOrphanageArgs): Promise<Orphanage> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new AddOrphanageRepositorySpy()
}

type SutTypes = { sut: DbAddOrphanage, addOrphanageRepositorySpy: AddOrphanageRepository}

const makeSut = (): SutTypes => {
  const addOrphanageRepositorySpy = mockAddOrphanageRepository()
  const sut = new DbAddOrphanage(addOrphanageRepositorySpy)
  return {
    sut,
    addOrphanageRepositorySpy
  }
}

describe('DbAddOrphanage Usecase', () => {
  test('Should be able to call AddOrphanageRepository with the correct values', async () => {
    const { sut, addOrphanageRepositorySpy } = makeSut()
    const addSpy = jest.spyOn(addOrphanageRepositorySpy, 'add')
    const data = orphanageArgs
    await sut.add(data)
    expect(addSpy).toHaveBeenCalledWith(data)
  })
})
