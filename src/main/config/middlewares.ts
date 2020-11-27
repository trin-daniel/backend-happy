import { BodyParser } from '@main/middlewares/body-parser'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(BodyParser)
}
