import { AddImageOrphanage, Controller, HttpRequest, HttpResponse, LoadOneOrphanage } from '@presentation/controllers/orphanage/add-image-orphanage/add-image-orphanage-controller-protocols'
import { InvalidRouteParamError } from '@presentation/errors'
import { noContent, notFound, serverError } from '@presentation/helpers/http-helpers'

export class AddImageOrphanageController implements Controller {
  constructor (
    private readonly loadOneOrphanage: LoadOneOrphanage,
    private readonly addImageOrphanage: AddImageOrphanage
  ) {}

  async handle (req: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const orphanage = await this.loadOneOrphanage.loadById(req.params.orphanage_id)
      if (!orphanage) {
        return notFound(new InvalidRouteParamError('orphanage_id'))
      }
      await this.addImageOrphanage.add(req.files, req.params.orphanage_id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
