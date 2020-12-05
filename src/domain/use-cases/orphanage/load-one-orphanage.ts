import { Orphanage } from '@domain/models/orphanage'

export interface LoadOneOrphanage {
  loadById (id: string): Promise<Orphanage>
}
