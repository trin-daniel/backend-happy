import { AddOrphanageRepository } from '@data/protocols/add-orphanage-repository'
import { Orphanage } from '@domain/models/orphanage'
import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'
import { SqlHelper } from '@infra/database/helpers/sql-helper'
import { v4 } from 'uuid'

export class OrphanageRepository implements AddOrphanageRepository {
  async add (data: AddOrphanageArgs): Promise<Orphanage> {
    const id = v4()
    await SqlHelper.insertOne('INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)  VALUES (?,?,?,?,?,?,?,?,?)',
      [id, data.name, data.latitude, data.longitude, data.about, data.instructions, data.opening_hours, data.closing_time, data.open_on_weekends]
    )
    const orphanage = await SqlHelper.selectOne('SELECT  id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends FROM orphanages WHERE id = (?)', [id])
    return orphanage
  }
}
