import { LoadOneOrphanage, LoadOneOrphanageRepository, Orphanage } from '@data/use-cases/orphanage/load-one-orphanage/db-load-one-orphanage-protocols'

export class DbLoadOneOrphanage implements LoadOneOrphanage {
  constructor (
    private readonly loadOneOrphanageRepository: LoadOneOrphanageRepository
  ) {}

  async loadById (id: string): Promise<Orphanage> {
    const orphanage = await this.loadOneOrphanageRepository.loadOne(id)
    return orphanage
  }
}
