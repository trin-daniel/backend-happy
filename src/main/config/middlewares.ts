import { BodyParser } from '@main/middlewares/body-parser'
import { ContentType } from '@main/middlewares/content-type'
import { Cors } from '@main/middlewares/cors-middleware'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(BodyParser)
  app.use(ContentType)
  app.use(Cors)
}
