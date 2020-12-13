import { AddImageOrphanageRepository } from '@data/protocols/add-image-orphanage-repository'
import { AddOrphanageRepository } from '@data/protocols/add-orphanage-repository'
import { LoadAllOrphanagesRepository } from '@data/protocols/load-all-orphanages-repository'
import { LoadOneOrphanageRepository } from '@data/protocols/load-one-orphanage-repository'
import { Image, Orphanage } from '@domain/models/orphanage'
import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'
import { SqlHelper } from '@infra/database/helpers/sql-helper'
import { uuid } from '@infra/database/helpers/uuid-helper'

export class OrphanageRepository implements AddOrphanageRepository, AddImageOrphanageRepository, LoadAllOrphanagesRepository, LoadOneOrphanageRepository {
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

  async addImage (files: Image[], orphanage_id: string): Promise<void> {
    files.forEach(async (photos) => {
      const id = uuid.generate()
      await SqlHelper.insertOne(`
      INSERT INTO photos (id, orphanage_id, filename, path, destination, mimetype, size)
      VALUES (?,?,?,?,?,?,?)`,
      [id, orphanage_id, photos.filename, photos.path, photos.destination, photos.mimetype, photos.size]
      )
    })
    return null
  }

  async load (): Promise<Orphanage[]> {
    const rows: any = await SqlHelper.selectAll(
      `SELECT
        orphanages.id,
        orphanages.name,
        orphanages.latitude,
        orphanages.longitude,
        orphanages.about,
        orphanages.instructions,
        orphanages.opening_hours,
        orphanages.closing_time,
        orphanages.open_on_weekends,
        IF(
          COUNT(photos.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'filename',
              photos.filename,
              'path',
              photos.path,
              'destination',
              photos.destination,
              'mimetype',
              photos.mimetype,
              'size',
              photos.size
            )
          )
        )AS photos
    FROM orphanages
    INNER JOIN photos 
    ON orphanages.id = photos.orphanage_id
    GROUP BY orphanages.id;`
    )

    return rows[0] ? rows : []
  }

  async loadOne (id: string): Promise<Orphanage> {
    const row = await SqlHelper.selectOne(
      `SELECT
        orphanages.id,
        orphanages.name,
        orphanages.latitude,
        orphanages.longitude,
        orphanages.about,
        orphanages.instructions,
        orphanages.opening_hours,
        orphanages.closing_time,
        orphanages.open_on_weekends,
        IF(
          COUNT(photos.id) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'filename',
              photos.filename,
              'path',
              photos.path,
              'destination',
              photos.destination,
              'mimetype',
              photos.mimetype,
              'size',
              photos.size
            )
          )
        )AS photos
    FROM orphanages
    INNER JOIN photos 
    ON orphanages.id = photos.orphanage_id AND orphanages.id = (?)
    GROUP BY orphanages.id;`, [id])
    return row || null
  }
}
