import { BodyParserMiddleware } from '@main/middlewares/body-parser-middleware'
import { ContentTypeMiddleware } from '@main/middlewares/content-type-middleware'
import { CorsMiddleware } from '@main/middlewares/cors-middleware'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(BodyParserMiddleware)
  app.use(ContentTypeMiddleware)
  app.use(CorsMiddleware)
}
