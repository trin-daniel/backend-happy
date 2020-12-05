import { LoadOneOrphanageRepository } from '@data/protocols/load-one-orphanage-repository'
import { Orphanage } from '@domain/models/orphanage'
import { LoadOrphanage } from '@domain/use-cases/orphanage/load-orphanage'

export class DbLoadOrphanage implements LoadOrphanage {
  constructor (
    private readonly loadOneOrphanageRepository: LoadOneOrphanageRepository
  ) {}

  async loadById (id: string): Promise<Orphanage> {
    const orphanage = await this.loadOneOrphanageRepository.loadOne(id)
    return orphanage
  }
}
