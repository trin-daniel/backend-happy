import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'
import { LoadOneOrphanage } from '@domain/use-cases/orphanage/load-one-orphanage'
import { noContent, notFound } from '@presentation/helpers/http-helpers'
import { InvalidRouteParamError } from '@presentation/errors'
import { AddImageOrphanage } from '@domain/use-cases/orphanage/add-image-orphanage'

export class AddImageOrphanageController implements Controller {
  constructor (
    private loadOneOrphanage: LoadOneOrphanage,
    private addImageOrphanage: AddImageOrphanage
  ) {}

  async handle (req: HttpRequest<any>): Promise<HttpResponse<any>> {
    const orphanage = await this.loadOneOrphanage.loadById(req.params.orphanage_id)
    if (!orphanage) {
      return notFound(new InvalidRouteParamError('orphanage_id'))
    }
    await this.addImageOrphanage.add(req.files, req.params.orphanage_id)
    return noContent()
  }
}
