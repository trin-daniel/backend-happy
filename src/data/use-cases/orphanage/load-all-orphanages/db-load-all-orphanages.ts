import { Orphanage, LoadAllOrphanages, LoadAllOrphanagesRepository } from '@data/use-cases/orphanage/load-all-orphanages/db-load-all-orphanages-protocols'

export class DbLoadAllOrphanages implements LoadAllOrphanages {
  constructor (
    private readonly loadAllOrphanagesRepository: LoadAllOrphanagesRepository
  ) {}

  async loadAll (): Promise<Orphanage[]> {
    const orphanages = await this.loadAllOrphanagesRepository.load()
    return orphanages
  }
}
