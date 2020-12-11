import { AddImageOrphanage } from '@domain/use-cases/orphanage/add-image-orphanage'
import { Image } from '@domain/models/orphanage'
import { AddImageOrphanageRepository } from '@data/protocols/add-image-orphanage-repository'

export class DbAddImageOrphanage implements AddImageOrphanage {
  constructor (
    private readonly addImageOrphanageRepository: AddImageOrphanageRepository
  ) {}

  async add (files: Image[], orphanage_id: string): Promise<void> {
    await this.addImageOrphanageRepository.addImage(files, orphanage_id)
    return null
  }
}
