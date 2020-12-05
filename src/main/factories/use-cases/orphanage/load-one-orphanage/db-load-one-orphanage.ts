import { DbLoadOneOrphanage } from '@data/use-cases/orphanage/load-one-orphanage/db-load-one-orphanage'
import { LoadOneOrphanage } from '@domain/use-cases/orphanage/load-one-orphanage'
import { OrphanageRepository } from '@infra/database/repositories/orphanage/orphanage-repository'

export const makeDbLoadOneOrphanage = (): LoadOneOrphanage => {
  const loadOneOrphanageRepository = new OrphanageRepository()
  return new DbLoadOneOrphanage(loadOneOrphanageRepository)
}
