import { AddOrphanage, AddOrphanageArgs, AddOrphanageRepository, Orphanage } from '@data/use-cases/orphanage/add-orphanage/db-add-orphanage-protocols'

export class DbAddOrphanage implements AddOrphanage {
  constructor (
    private readonly addOrphanageRepository: AddOrphanageRepository
  ) {}

  async add (data: AddOrphanageArgs): Promise<Orphanage> {
    const orphanage = await this.addOrphanageRepository.add(data)
    return orphanage
  }
}
