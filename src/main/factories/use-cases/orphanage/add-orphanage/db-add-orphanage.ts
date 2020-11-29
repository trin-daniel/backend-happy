import { DbAddOrphanage } from '@data/use-cases/orphanage/add-orphanage/db-add-orphanage'
import { OrphanageRepository } from '@infra/database/repositories/orphanage/orphanage-repository'

export const makeDbAddOrphanage = (): DbAddOrphanage => {
  const addOrphanageRepository = new OrphanageRepository()
  return new DbAddOrphanage(addOrphanageRepository)
}
