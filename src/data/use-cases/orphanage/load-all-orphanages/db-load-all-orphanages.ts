import { LoadAllOrphanagesRepository } from '@data/protocols/load-all-orphanages-repository'
import { Orphanage } from '@domain/models/orphanage'
import { LoadAllOrphanages } from '@domain/use-cases/orphanage/load-all-orphanages'

export class DbLoadAllOrphanages implements LoadAllOrphanages {
  constructor (
    private readonly loadAllOrphanagesRepository: LoadAllOrphanagesRepository
  ) {}

  async loadAll (): Promise<Orphanage[]> {
    const orphanages = await this.loadAllOrphanagesRepository.load()
    return orphanages
  }
}
