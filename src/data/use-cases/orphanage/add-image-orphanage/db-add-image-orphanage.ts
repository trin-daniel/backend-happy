import { AddImageOrphanage, AddImageOrphanageRepository, Image } from '@data/use-cases/orphanage/add-image-orphanage/db-add-image-orphanage-protocols'

export class DbAddImageOrphanage implements AddImageOrphanage {
  constructor (
    private readonly addImageOrphanageRepository: AddImageOrphanageRepository
  ) {}

  async add (files: Image[], orphanage_id: string): Promise<void> {
    await this.addImageOrphanageRepository.addImage(files, orphanage_id)
    return null
  }
}
