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

type SutTypes = { sut: OrphanageRepository }

const makeSut = (): SutTypes => {
  const sut = new OrphanageRepository()
  return {
    sut
  }
}

describe('Orphanage Repository', () => {
  beforeAll(async () => await SqlHelper.connect())
  afterAll(async () => await SqlHelper.disconnect())
  beforeEach(async () => await SqlHelper.delete('DELETE FROM orphanages'))

  test('Should be able to add a new orphanage to the database', async () => {
    const { sut } = makeSut()
    const orphanage = await sut.add(orphanageArgs)
    expect(orphanage).toBeTruthy()
    expect(orphanage.id).toBeTruthy()
  })

  test('Should be able to return a list of orphanages if successful', async () => {
    const id = random.uuid()
    await SqlHelper.insertOne('INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)  VALUES (?,?,?,?,?,?,?,?,?)',
      [id, orphanageArgs.name, orphanageArgs.latitude, orphanageArgs.longitude, orphanageArgs.about, orphanageArgs.instructions, orphanageArgs.opening_hours, orphanageArgs.closing_time, orphanageArgs.open_on_weekends]
    )
    const { sut } = makeSut()
    const orphanages = await sut.load()
    expect(orphanages).toBeTruthy()
  })

  test('Should be able to return an empty matrix if there is no data in the table', async () => {
    const { sut } = makeSut()
    const orphanages = await sut.load()
    expect(orphanages).toEqual([])
  })
})
