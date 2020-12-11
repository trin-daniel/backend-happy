import { Image } from '@domain/models/orphanage'

export interface AddImageOrphanageRepository {
  addImage (files: Image[], orphanage_id: string): Promise<void>
}
