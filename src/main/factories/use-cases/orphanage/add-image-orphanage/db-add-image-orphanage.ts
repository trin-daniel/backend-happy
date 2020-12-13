import { DbAddImageOrphanage } from '@data/use-cases/orphanage/add-image-orphanage/db-add-image-orphanage'
import { OrphanageRepository } from '@infra/database/repositories/orphanage/orphanage-repository'

export const makeDbAddImageOrphanage = (): DbAddImageOrphanage => {
  const addImageOrphanageRepository = new OrphanageRepository()
  return new DbAddImageOrphanage(addImageOrphanageRepository)
}
