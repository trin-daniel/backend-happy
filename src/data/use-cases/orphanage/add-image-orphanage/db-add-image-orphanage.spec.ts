import { Image } from '@domain/models/orphanage'
import { DbAddImageOrphanage } from '@data/use-cases/orphanage/add-image-orphanage/db-add-image-orphanage'
import { AddImageOrphanageRepository } from '@data/protocols/add-image-orphanage-repository'
import { random, system } from 'faker/locale/pt_BR'

const photo = (): Image => ({ id: random.uuid(), filename: system.fileName(), path: system.filePath(), destination: system.directoryPath(), mimetype: system.mimeType(), size: 256 })
const orphanage_id = random.uuid()

const mockAddImageOrphanageRepository = (): AddImageOrphanageRepository => {
  class AddImageOrphanageRepositorySpy implements AddImageOrphanageRepository {
    async addImage (files: Image[], orphanage_id: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddImageOrphanageRepositorySpy()
}

describe('DbAddImageOrphanage Usecase', () => {
  test('Should be able to call AddImageOrphanageRepository with the correct values', async () => {
    const addImageOrphanageRepositorySpy = mockAddImageOrphanageRepository()
    const sut = new DbAddImageOrphanage(addImageOrphanageRepositorySpy)
    const addImage = jest.spyOn(addImageOrphanageRepositorySpy, 'addImage')
    const files = [photo(), photo()]
    await sut.add(files, orphanage_id)
    expect(addImage).toHaveBeenCalledWith(files, orphanage_id)
  })
})
