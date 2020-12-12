import { AddOrphanageRepository } from '@data/protocols/add-orphanage-repository'
import { LoadAllOrphanagesRepository } from '@data/protocols/load-all-orphanages-repository'
import { LoadOneOrphanageRepository } from '@data/protocols/load-one-orphanage-repository'
import { Image, Orphanage } from '@domain/models/orphanage'
import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'
import { SqlHelper } from '@infra/database/helpers/sql-helper'
import { uuid } from '@infra/database/helpers/uuid-helper'

export class OrphanageRepository implements AddOrphanageRepository, LoadAllOrphanagesRepository, LoadOneOrphanageRepository {
  async add (data: AddOrphanageArgs): Promise<Orphanage> {
    const id = uuid.generate()
    await SqlHelper.insertOne(`
    INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [id, data.name, data.latitude, data.longitude, data.about, data.instructions, data.opening_hours, data.closing_time, data.open_on_weekends]
    )
    const orphanage = await SqlHelper.selectOne(`
    SELECT  id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends 
    FROM orphanages 
    WHERE id = (?)`, [id]
    )
    return orphanage
  }

  async load (): Promise<Orphanage[]> {
    const orphanages:any = await SqlHelper.selectAll(`
    SELECT orphanages.id, orphanages.name, orphanages.latitude, orphanages.longitude, orphanages.about, orphanages.instructions, orphanages.opening_hours, orphanages.closing_time, orphanages.open_on_weekends, photos.filename, photos.path, photos.destination, photos.mimetype, photos.size
    FROM orphanages
    INNER JOIN photos on orphanages.id = photos.orphanage_id
    `)
    const row: Orphanage = orphanages.map((orphanage: Orphanage & Image) => {
      return {
        id: orphanage.id,
        name: orphanage.name,
        latitude: orphanage.latitude,
        longitude: orphanage.longitude,
        about: orphanage.about,
        instructions: orphanage.instructions,
        opening_hours: orphanage.opening_hours,
        closing_time: orphanage.closing_time,
        open_on_weekends: orphanage.open_on_weekends,
        photos: [{
          filename: orphanage.filename,
          path: orphanage.path,
          destination: orphanage.destination,
          mimetype: orphanage.mimetype,
          size: orphanage.size
        }]
      }
    })
    return row[0] ? row[0] : []
  }

  async loadOne (id: string): Promise<Orphanage> {
    const orphanage = await SqlHelper.selectOne(
    `SELECT orphanages.id, orphanages.name, orphanages.latitude, orphanages.longitude, orphanages.about, orphanages.instructions, orphanages.opening_hours, orphanages.closing_time, orphanages.open_on_weekends, photos.filename, photos.path, photos.destination, photos.mimetype, photos.size
    FROM orphanages
    INNER JOIN photos ON orphanages.id = photos.orphanage_id 
    WHERE orphanages.id = (?)`, [id]
    )
    const formatOrphanage: Orphanage = {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      closing_time: orphanage.closing_time,
      open_on_weekends: orphanage.open_on_weekends,
      photos: [{
        filename: orphanage.filename,
        path: orphanage.path,
        destination: orphanage.destination,
        mimetype: orphanage.mimetype,
        size: orphanage.size
      }]
    }
    console.log(formatOrphanage)
    return formatOrphanage || null
  }
}
