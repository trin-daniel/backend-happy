import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'
import { SqlHelper } from '@infra/database/helpers/sql-helper'
import app from '@main/config/app'
import request from 'supertest'
import { random, internet, address, system } from 'faker/locale/pt_BR'
import { Image } from '@domain/models/orphanage'

const photo = (): Image => ({ id: random.uuid(), filename: system.fileName(), path: system.filePath(), destination: system.directoryPath(), mimetype: 'jpg', size: 256 })
const inputs: AddOrphanageArgs = {
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: '00:38:36',
  closing_time: '14:38:36',
  open_on_weekends: true
}

describe('Load One Orphanage Route', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.delete('DELETE FROM orphanages'))

  test('Should be able to return an orphanage if successful', async () => {
    const id = random.uuid()
    const file = photo()
    await SqlHelper.insertOne('INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)  VALUES (?,?,?,?,?,?,?,?,?)',
      [id, inputs.name, inputs.latitude, inputs.longitude, inputs.about, inputs.instructions, inputs.opening_hours, inputs.closing_time, inputs.open_on_weekends]
    )

    await SqlHelper.insertOne(`
    INSERT INTO photos (id, orphanage_id, filename, path, destination, mimetype, size)  
    VALUES (?,?,?,?,?,?,?)`,
    [file.id, id, file.filename, file.path, file.destination, file.mimetype, file.size]
    )

    await request(app).get(`/api/orphanage/${id}`).expect(200)
  })
})
