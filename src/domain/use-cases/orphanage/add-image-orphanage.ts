import { Image } from '@domain/models/orphanage'

export interface AddImageOrphanage {
  add (files: Image[], orphanage_id: string): Promise<void>
}
