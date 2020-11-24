import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const ok = (data: object): HttpResponse<any> => {
  return {
    statusCode: 200,
    body: data
  }
}

export const badRequest = (error: Error): HttpResponse<Error> => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (error: Error): HttpResponse<Error> => {
  return {
    statusCode: 500,
    body: new ServerError(error)
  }
}
