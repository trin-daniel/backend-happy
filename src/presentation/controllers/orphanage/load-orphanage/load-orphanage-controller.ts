import { LoadOrphanage } from '@domain/use-cases/orphanage/load-orphanage'
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'

export class LoadOrphanageController implements Controller {
  constructor (
    private readonly loadOrphanage: LoadOrphanage
  ) {}

  async handle (req: HttpRequest<any>): Promise<HttpResponse<any>> {
    await this.loadOrphanage.loadById(req.params.id)
    return Promise.resolve(null)
  }
}
