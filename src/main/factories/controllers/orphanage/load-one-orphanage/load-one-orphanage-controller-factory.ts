import { Controller } from '@presentation/protocols'
import { makeDbLoadOneOrphanage } from '@main/factories/use-cases/orphanage/load-one-orphanage/db-load-one-orphanage'
import { LoadOneOrphanageController } from '@presentation/controllers/orphanage/load-one-orphanage/load-one-orphanage-controller'

export const makeLoadOneOrphanageControllerFactory = (): Controller => {
  const loadOneOrphanage = makeDbLoadOneOrphanage()
  return new LoadOneOrphanageController(loadOneOrphanage)
}
