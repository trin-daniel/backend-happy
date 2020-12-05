import { Controller } from '@presentation/protocols'
import { makeDbLoadOneOrphanage } from '@main/factories/use-cases/orphanage/load-one-orphanage/db-load-one-orphanage'
import { LoadOrphanageController } from '@presentation/controllers/orphanage/load-orphanage/load-orphanage-controller'

export const makeLoadOneOrphanageControllerFactory = (): Controller => {
  const loadOneOrphanage = makeDbLoadOneOrphanage()
  return new LoadOrphanageController(loadOneOrphanage)
}
