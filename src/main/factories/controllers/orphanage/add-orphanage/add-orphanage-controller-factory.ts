import { makeDbAddOrphanage } from '@main/factories/use-cases/orphanage/add-orphanage/db-add-orphanage'
import { AddOrphanageController } from '@presentation/controllers/orphanage/add-orphanage/add-orphanage-controller'
import { Controller } from '@presentation/protocols'
import { makeAddOrphanageValidationFactory } from '@main/factories/controllers/orphanage/add-orphanage/add-orphanage-validation-factory'

export const makeAddOrphanageControllerFactory = (): Controller => {
  const addOrphanageValidation = makeAddOrphanageValidationFactory()
  const addOrphanage = makeDbAddOrphanage()
  return new AddOrphanageController(addOrphanageValidation, addOrphanage)
}
