import { Orphanage } from '@domain/models/orphanage'

export interface LoadAllOrphanages {
  loadAll ():Promise<Orphanage[]>
}
