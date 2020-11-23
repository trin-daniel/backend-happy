import { HttpRequest, HttpResponse } from '.'

export interface Controller {
  handle (req: HttpRequest<any>): Promise<HttpResponse<any>>
}
