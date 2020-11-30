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

describe('Add Orphanage Route', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.delete('DELETE FROM orphanages'))

  test('Should be able to return 200 if the orphanage is successfully added', async () => {
    await request(app)
      .post('/api/add-orphanage')
      .send(inputs)
      .expect(200)
  })
})
