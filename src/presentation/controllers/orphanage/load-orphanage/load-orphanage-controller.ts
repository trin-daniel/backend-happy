import { Controller, HttpRequest, HttpResponse, LoadOrphanage, Orphanage } from '@presentation/controllers/orphanage/load-orphanage/load-orphanage-controller-protocols'
import { ok, serverError } from '@presentation/helpers/http-helpers'

export class LoadOrphanageController implements Controller {
  constructor (
    private readonly loadOrphanage: LoadOrphanage
  ) {}

  async handle (req: HttpRequest<any>): Promise<HttpResponse<Orphanage | Error>> {
    try {
      const orphanage = await this.loadOrphanage.loadById(req.params.id)
      return ok(orphanage)
    } catch (error) {
      return serverError(error)
    }
  }
}
