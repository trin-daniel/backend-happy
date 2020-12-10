export type Image = {
  id: string,
  filename: string,
  path: string,
  destination: string,
  mimetype: string,
  size: number
}

export type Orphanage = {
  id: string,
  name: string,
  latitude: number,
  longitude: number,
  about: string,
  instructions: string,
  opening_hours: string,
  closing_time: string
  open_on_weekends: boolean,
  photos?: Image[]
}
