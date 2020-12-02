import { Orphanage } from '@domain/models/orphanage'
import { LoadAllOrphanages } from '@domain/use-cases/orphanage/load-all-orphanages'
import { ok } from '@presentation/helpers/http-helpers'
import { Controller, HttpResponse } from '@presentation/protocols'

export class LoadAllOrphanagesController implements Controller {
  constructor (
    private readonly loadAllOrphanages: LoadAllOrphanages
  ) {}

  async handle (): Promise<HttpResponse<Orphanage[] | Error>> {
    const orphanages = await this.loadAllOrphanages.loadAll()
    return ok(orphanages)
  }
}
