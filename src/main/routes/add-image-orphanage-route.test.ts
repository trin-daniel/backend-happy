import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'
import { SqlHelper } from '@infra/database/helpers/sql-helper'
import app from '@main/config/app'
import supertest from 'supertest'
import path from 'path'
import { random, internet, address } from 'faker/locale/pt_BR'
const id = random.uuid()
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
const fileDir = path.resolve(__dirname, '..', '..', '..', 'tmp', 'local', 'foto.jpg')

describe('Add Image Orphanage Route', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => {
    await SqlHelper.delete('DELETE FROM orphanages')
    await SqlHelper.delete('DELETE FROM photos')
  })
  test('Should be able to add photos from the orphanage', async () => {
    await SqlHelper.insertOne('INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)  VALUES (?,?,?,?,?,?,?,?,?)',
      [id, inputs.name, inputs.latitude, inputs.longitude, inputs.about, inputs.instructions, inputs.opening_hours, inputs.closing_time, inputs.open_on_weekends]
    )
    await supertest(app).post(`/api/add-images/${id}`).attach('files', fileDir).expect(204)
  })
})
