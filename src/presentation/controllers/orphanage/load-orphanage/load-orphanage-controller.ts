import { LoadOrphanage } from '@domain/use-cases/orphanage/load-orphanage'
import { ok } from '@presentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'
import { Orphanage } from '../add-orphanage/add-orphanage-controller-protocols'

export class LoadOrphanageController implements Controller {
  constructor (
    private readonly loadOrphanage: LoadOrphanage
  ) {}

  async handle (req: HttpRequest<any>): Promise<HttpResponse<Orphanage | Error>> {
    const orphanage = await this.loadOrphanage.loadById(req.params.id)
    return ok(orphanage)
  }
}
