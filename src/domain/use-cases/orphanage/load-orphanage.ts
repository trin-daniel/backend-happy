import { Orphanage } from '@domain/models/orphanage'

export interface LoadOrphanage {
  loadById (id: string): Promise<Orphanage>
}
