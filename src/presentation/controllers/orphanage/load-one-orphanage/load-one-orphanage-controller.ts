import { Controller, HttpRequest, HttpResponse, LoadOneOrphanage, Orphanage } from '@presentation/controllers/orphanage/load-one-orphanage/load-one-orphanage-controller-protocols'
import { InvalidRouteParamError } from '@presentation/errors'
import { notFound, ok, serverError } from '@presentation/helpers/http-helpers'

export class LoadOneOrphanageController implements Controller {
  constructor (
    private readonly LoadOneOrphanage: LoadOneOrphanage
  ) {}

  async handle (req: HttpRequest<any>): Promise<HttpResponse<Orphanage | Error>> {
    try {
      const orphanage = await this.LoadOneOrphanage.loadById(req.params.id)
      if (!orphanage) {
        return notFound(new InvalidRouteParamError('orphanage_id'))
      }
      return ok(orphanage)
    } catch (error) {
      return serverError(error)
    }
  }
}
