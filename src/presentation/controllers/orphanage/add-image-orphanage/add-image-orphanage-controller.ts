import { Controller, HttpRequest } from '@presentation/protocols'
import { LoadOneOrphanage } from '@domain/use-cases/orphanage/load-one-orphanage'

export class AddImageOrphanageController implements Controller {
  constructor (
    private loadOneOrphanage: LoadOneOrphanage
  ) {}

  async handle (req: HttpRequest<any>): Promise<any> {
    await this.loadOneOrphanage.loadById(req.params.orphanage_id)
    return Promise.resolve()
  }
}
