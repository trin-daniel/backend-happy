import { HttpResponse } from 'presentation/protocols'

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
