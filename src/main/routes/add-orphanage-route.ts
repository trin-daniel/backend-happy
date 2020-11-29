import { ExpressRouteAdapter } from '@main/adapters/express/express-route-adapter'
import { makeAddOrphanageControllerFactory } from '@main/factories/controllers/orphanage/add-orphanage/add-orphanage-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/add-orphanage', ExpressRouteAdapter(makeAddOrphanageControllerFactory()))
}
