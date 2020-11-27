import { Request, Response, NextFunction } from 'express'

export const ContentTypeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}
