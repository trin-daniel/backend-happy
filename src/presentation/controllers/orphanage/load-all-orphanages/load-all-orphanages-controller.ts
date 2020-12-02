import { Orphanage } from '@domain/models/orphanage'
import { LoadAllOrphanages } from '@domain/use-cases/orphanage/load-all-orphanages'
import { Controller, HttpResponse } from '@presentation/protocols'

export class LoadAllOrphanagesController implements Controller {
  constructor (
    private readonly loadAllOrphanages: LoadAllOrphanages
  ) {}

  async handle (): Promise<HttpResponse<Orphanage[] | Error>> {
    await this.loadAllOrphanages.loadAll()
    return Promise.resolve(null)
  }
}
