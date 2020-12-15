import { SqlHelper } from '@infra/database/helpers/sql-helper'
import { random, internet, address } from 'faker'

const data = {
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: '00:38:36',
  closing_time: '14:38:36',
  open_on_weekends: random.boolean()
}

describe('Sql Helper', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => {
    await SqlHelper.delete('DELETE FROM orphanages')
    await SqlHelper.delete('DELETE FROM photos')
  })

  test('Should be able to reconnect if the connection goes down', async () => {
    const id = random.uuid()
    await SqlHelper.insertOne(`
    INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)  
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [id, data.name, data.latitude, data.longitude, data.about, data.instructions, data.opening_hours, data.closing_time, data.open_on_weekends]
    )
    await SqlHelper.disconnect()
    const orphanage = await SqlHelper.selectAll(`
    SELECT id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends
    FROM orphanages
    WHERE id = (?)`, [id])
    expect(orphanage).toBeTruthy()
  })
})
