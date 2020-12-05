import { Orphanage } from '@domain/models/orphanage'

export interface LoadOneOrphanageRepository {
  loadOne (id: string): Promise<Orphanage>
}
