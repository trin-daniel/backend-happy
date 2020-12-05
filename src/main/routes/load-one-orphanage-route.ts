import { ExpressRouteAdapter } from '@main/adapters/express/express-route-adapter'
import { makeLoadOneOrphanageControllerFactory } from '@main/factories/controllers/orphanage/load-one-orphanage/load-one-orphanage-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/orphanage/:id', ExpressRouteAdapter(makeLoadOneOrphanageControllerFactory()))
}
