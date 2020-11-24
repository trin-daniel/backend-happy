import { HttpRequest, HttpResponse } from '@presentation/protocols'

export interface Controller {
  handle (req: HttpRequest<any>): Promise<HttpResponse<any>>
}
