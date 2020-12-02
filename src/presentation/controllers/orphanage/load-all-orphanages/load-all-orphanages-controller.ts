import { Controller, HttpResponse, LoadAllOrphanages, Orphanage } from '@presentation/controllers/orphanage/load-all-orphanages/load-all-orphanages-controller-protocols'
import { ok, serverError } from '@presentation/helpers/http-helpers'

export class LoadAllOrphanagesController implements Controller {
  constructor (
    private readonly loadAllOrphanages: LoadAllOrphanages
  ) {}

  async handle (): Promise<HttpResponse<Orphanage[] | Error>> {
    try {
      const orphanages = await this.loadAllOrphanages.loadAll()
      return ok(orphanages)
    } catch (err) {
      return serverError(err)
    }
  }
}
