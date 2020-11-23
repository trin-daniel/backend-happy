import { Orphanage } from '../../../../domain/models/orphanage'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'
import { AddOrphanage, AddOrphanageArgs } from '../../../../domain/use-cases/orphanage/add-orphanage'
import { badRequest, ok } from '../../../helpers/http-helpers'

export class AddOrphanageController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrphanage: AddOrphanage
  ) {}

  async handle (req: HttpRequest<AddOrphanageArgs>): Promise<HttpResponse<Orphanage | Error>> {
    const error = this.validation.validate(req.body)
    if (error) {
      return badRequest(error)
    }
    const orphanage = await this.addOrphanage.add(req.body)
    return ok(orphanage)
  }
}
