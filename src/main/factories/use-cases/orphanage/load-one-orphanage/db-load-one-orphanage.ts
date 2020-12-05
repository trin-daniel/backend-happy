import { DbLoadOrphanage } from '@data/use-cases/orphanage/load-orphanage/db-load-orphanage'
import { LoadOrphanage } from '@domain/use-cases/orphanage/load-orphanage'
import { OrphanageRepository } from '@infra/database/repositories/orphanage/orphanage-repository'

export const makeDbLoadOneOrphanage = (): LoadOrphanage => {
  const loadOneOrphanageRepository = new OrphanageRepository()
  return new DbLoadOrphanage(loadOneOrphanageRepository)
}
