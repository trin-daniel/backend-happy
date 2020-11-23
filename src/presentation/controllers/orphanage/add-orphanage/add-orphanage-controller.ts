import { Orphanage } from '../../../../domain/models/orphanage'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'
import { AddOrphanage, AddOrphanageArgs } from '../../../../domain/use-cases/orphanage/add-orphanage'
import { badRequest, ok, serverError } from '../../../helpers/http-helpers'

export class AddOrphanageController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrphanage: AddOrphanage
  ) {}

  async handle (req: HttpRequest<AddOrphanageArgs>): Promise<HttpResponse<Orphanage | Error>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) {
        return badRequest(error)
      }
      const orphanage = await this.addOrphanage.add(req.body)
      return ok(orphanage)
    } catch (error) {
      return serverError(new Error())
    }
  }
}
