import { AddImageOrphanageController } from '@presentation/controllers/orphanage/add-image-orphanage/add-image-orphanage-controller'
import { Controller } from '@presentation/protocols'
import { makeDbAddImageOrphanage } from '@main/factories/use-cases/orphanage/add-image-orphanage/db-add-image-orphanage'
import { makeDbLoadOneOrphanage } from '@main/factories/use-cases/orphanage/load-one-orphanage/db-load-one-orphanage'

export const makeAddImageOrphanageControllerFactory = (): Controller => {
  const addImageOrphanage = makeDbAddImageOrphanage()
  const loadOneOrphanage = makeDbLoadOneOrphanage()
  return new AddImageOrphanageController(loadOneOrphanage, addImageOrphanage)
}
