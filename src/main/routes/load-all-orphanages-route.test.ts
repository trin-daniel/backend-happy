import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'
import { SqlHelper } from '@infra/database/helpers/sql-helper'
import app from '@main/config/app'
import request from 'supertest'
import { random, internet, address, time } from 'faker/locale/pt_BR'

const inputs: AddOrphanageArgs = {
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: time.recent(),
  closing_time: time.recent(),
  open_on_weekends: true
}

describe('Load All Orphanages Route', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.delete('DELETE FROM orphanages'))

  test('Should be able to return a list of orphanages if successful', async () => {
    const id = random.uuid()
    await SqlHelper.insertOne('INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)  VALUES (?,?,?,?,?,?,?,?,?)',
      [id, inputs.name, inputs.latitude, inputs.longitude, inputs.about, inputs.instructions, inputs.opening_hours, inputs.closing_time, inputs.open_on_weekends]
    )
    await request(app).get('/api/load-all-orphanages').expect(200)
  })
})
