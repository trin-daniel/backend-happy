import { BodyParserMiddleware, CorsMiddleware, ContentTypeMiddleware, noCacheMiddleware } from '@main/middlewares'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(BodyParserMiddleware)
  app.use(ContentTypeMiddleware)
  app.use(CorsMiddleware)
  app.use(noCacheMiddleware)
}
