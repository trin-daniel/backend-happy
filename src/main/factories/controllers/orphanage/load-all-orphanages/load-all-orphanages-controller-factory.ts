import { makeDbLoadAllOrphanages } from '@main/factories/use-cases/orphanage/load-all-orphanages/db-load-all-orphanages'
import { LoadAllOrphanagesController } from '@presentation/controllers/orphanage/load-all-orphanages/load-all-orphanages-controller'
import { Controller } from '@presentation/protocols'

export const makeLoadAllOrphanagesControllerFactory = (): Controller => {
  const loadAllOrphanages = makeDbLoadAllOrphanages()
  return new LoadAllOrphanagesController(loadAllOrphanages)
}
