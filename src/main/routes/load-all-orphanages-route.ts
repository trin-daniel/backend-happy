import { ExpressRouteAdapter } from '@main/adapters/express/express-route-adapter'
import { makeLoadAllOrphanagesControllerFactory } from '@main/factories/controllers/orphanage/load-all-orphanages/load-all-orphanages-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/load-all-orphanages', ExpressRouteAdapter(makeLoadAllOrphanagesControllerFactory()))
}
