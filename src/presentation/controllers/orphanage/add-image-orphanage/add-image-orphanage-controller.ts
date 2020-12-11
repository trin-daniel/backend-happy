import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'
import { LoadOneOrphanage } from '@domain/use-cases/orphanage/load-one-orphanage'
import { notFound } from '@presentation/helpers/http-helpers'
import { InvalidRouteParamError } from '@presentation/errors'

export class AddImageOrphanageController implements Controller {
  constructor (
    private loadOneOrphanage: LoadOneOrphanage
  ) {}

  async handle (req: HttpRequest<any>): Promise<HttpResponse<any>> {
    const orphanage = await this.loadOneOrphanage.loadById(req.params.orphanage_id)
    if (!orphanage) {
      return notFound(new InvalidRouteParamError('orphanage_id'))
    }
  }
}
