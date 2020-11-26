import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'
import { OrphanageRepository } from '@infra/database/repositories/orphanage/orphanage-repository'
import { SqlHelper } from '@infra/database/helpers/sql-helper'
import { internet, random, time, address } from 'faker/locale/pt_BR'

const orphanageArgs: AddOrphanageArgs = {
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: time.recent(),
  closing_time: time.recent(),
  open_on_weekends: random.boolean()
}

describe('Orphanage Repository', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.delete('DELETE FROM orphanages'))

  test('Should be able to add a new orphanage to the database', async () => {
    const sut = new OrphanageRepository()
    const orphanage = await sut.add(orphanageArgs)
    expect(orphanage).toBeTruthy()
    expect(orphanage.id).toBeTruthy()
  })
})
