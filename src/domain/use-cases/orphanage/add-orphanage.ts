import { Orphanage } from '@domain/models/orphanage'

export type AddOrphanageArgs = {
  name: string,
  latitude: number,
  longitude: number,
  about: string,
  instructions: string,
  opening_hours: Date,
  closing_time: Date
  open_on_weekends: boolean
}
export interface AddOrphanage {
  add (data: AddOrphanageArgs): Promise<Orphanage>
}
