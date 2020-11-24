import { AddOrphanageRepository } from '@data/protocols/add-orphanage-repository'
import { Orphanage } from '@domain/models/orphanage'
import { AddOrphanage, AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'

export class DbAddOrphanage implements AddOrphanage {
  constructor (
    private readonly addOrphanageRepository: AddOrphanageRepository
  ) {}

  async add (data: AddOrphanageArgs): Promise<Orphanage> {
    await this.addOrphanageRepository.add(data)
    return Promise.resolve(null)
  }
}
