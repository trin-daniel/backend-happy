import { Orphanage } from '@domain/models/orphanage'
import { LoadAllOrphanages } from '@domain/use-cases/orphanage/load-all-orphanages'
import { ok, serverError } from '@presentation/helpers/http-helpers'
import { Controller, HttpResponse } from '@presentation/protocols'

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
