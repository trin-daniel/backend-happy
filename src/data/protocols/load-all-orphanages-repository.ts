import { Orphanage } from '@domain/models/orphanage'

export interface LoadAllOrphanagesRepository {
  load (): Promise<Orphanage[]>
}
