import { ExpressRouteAdapter } from '@main/adapters/express/express-route-adapter'
import { makeAddImageOrphanageControllerFactory } from '@main/factories/controllers/orphanage/add-images-orphanage/add-image-orphanage-controller-factory'
import multerMiddleware from '@main/middlewares/multer-middleware'
import { Router } from 'express'
import multer from 'multer'

export default (router: Router): void => {
  router.post('/add-images/:orphanage_id', multer(multerMiddleware).array('files', 5), ExpressRouteAdapter(makeAddImageOrphanageControllerFactory()))
}
