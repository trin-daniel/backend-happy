import { Orphanage } from '@domain/models/orphanage'
import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'

export interface AddOrphanageRepository {
  add (data: AddOrphanageArgs): Promise<Orphanage>
}
