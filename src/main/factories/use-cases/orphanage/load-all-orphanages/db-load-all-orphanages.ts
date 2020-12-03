import { DbLoadAllOrphanages } from '@data/use-cases/orphanage/load-all-orphanages/db-load-all-orphanages'
import { LoadAllOrphanages } from '@domain/use-cases/orphanage/load-all-orphanages'
import { OrphanageRepository } from '@infra/database/repositories/orphanage/orphanage-repository'

export const makeDbLoadAllOrphanages = (): LoadAllOrphanages => {
  const loadAllOrphanagesRepository = new OrphanageRepository()
  return new DbLoadAllOrphanages(loadAllOrphanagesRepository)
}
