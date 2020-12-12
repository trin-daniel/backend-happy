import { Controller, HttpRequest } from '@presentation/protocols'
import { Request, Response, Express } from 'express'

export const ExpressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest<any> = {
      body: req.body,
      params: req.params,
      files: req.files as Express.Multer.File[]
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({ Error: httpResponse.body.message })
    }
  }
}
