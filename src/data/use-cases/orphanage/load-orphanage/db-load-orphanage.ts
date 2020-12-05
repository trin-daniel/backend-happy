import { LoadOrphanage, LoadOneOrphanageRepository, Orphanage } from '@data/use-cases/orphanage/load-orphanage/db-load-orphanage-protocols'

export class DbLoadOrphanage implements LoadOrphanage {
  constructor (
    private readonly loadOneOrphanageRepository: LoadOneOrphanageRepository
  ) {}

  async loadById (id: string): Promise<Orphanage> {
    const orphanage = await this.loadOneOrphanageRepository.loadOne(id)
    return orphanage
  }
}
