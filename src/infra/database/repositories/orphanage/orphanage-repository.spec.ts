import { AddOrphanageArgs } from '@domain/use-cases/orphanage/add-orphanage'
import { Image } from '@domain/models/orphanage'
import { OrphanageRepository } from '@infra/database/repositories/orphanage/orphanage-repository'
import { SqlHelper } from '@infra/database/helpers/sql-helper'
import { internet, random, address, system } from 'faker/locale/pt_BR'

const photo = (): Image => ({ id: random.uuid(), filename: system.fileName(), path: system.filePath(), destination: system.directoryPath(), mimetype: 'jpg', size: 256 })
const orphanageArgs: AddOrphanageArgs = {
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: '00:38:36',
  closing_time: '14:38:36',
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
  beforeEach(async () => {
    await SqlHelper.delete('DELETE FROM orphanages')
    await SqlHelper.delete('DELETE FROM photos')
  })

  test('Should be able to add a new orphanage to the database', async () => {
    const { sut } = makeSut()
    const orphanage = await sut.add(orphanageArgs)
    expect(orphanage).toBeTruthy()
    expect(orphanage.id).toBeTruthy()
  })

  test('Should be able to return a list of orphanages if successful', async () => {
    const id = random.uuid()
    const file = photo()
    await SqlHelper.insertOne(`
    INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)  
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [id, orphanageArgs.name, orphanageArgs.latitude, orphanageArgs.longitude, orphanageArgs.about, orphanageArgs.instructions, orphanageArgs.opening_hours, orphanageArgs.closing_time, orphanageArgs.open_on_weekends]
    )
    await SqlHelper.insertOne(`
    INSERT INTO photos (id, orphanage_id, filename, path, destination, mimetype, size)  
    VALUES (?,?,?,?,?,?,?)`,
    [file.id, id, file.filename, file.path, file.destination, file.mimetype, file.size]
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

  test('Should be able to return null if there are no orphanages with the provided identifier', async () => {
    const { sut } = makeSut()
    const id = random.uuid()
    const orphanages = await sut.loadOne(id)
    expect(orphanages).toBeNull()
  })

  test('Should be able to return an orphanage if successful', async () => {
    const { sut } = makeSut()
    const id = random.uuid()
    const file = photo()
    await SqlHelper.insertOne('INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)  VALUES (?,?,?,?,?,?,?,?,?)',
      [id, orphanageArgs.name, orphanageArgs.latitude, orphanageArgs.longitude, orphanageArgs.about, orphanageArgs.instructions, orphanageArgs.opening_hours, orphanageArgs.closing_time, orphanageArgs.open_on_weekends]
    )
    await SqlHelper.insertOne(`
    INSERT INTO photos (id, orphanage_id, filename, path, destination, mimetype, size)  
    VALUES (?,?,?,?,?,?,?)`,
    [file.id, id, file.filename, file.path, file.destination, file.mimetype, file.size]
    )
    const orphanage = await sut.loadOne(id)
    expect(orphanage).toBeTruthy()
    expect(orphanage.id).toBe(id)
  })
  test('Should be able to add images successfully', async () => {
    const { sut } = makeSut()
    const id = random.uuid()
    const files = [photo(), photo()]
    await SqlHelper.insertOne(`
    INSERT INTO orphanages (id, name, latitude, longitude, about, instructions, opening_hours, closing_time, open_on_weekends)
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [id, orphanageArgs.name, orphanageArgs.latitude, orphanageArgs.longitude, orphanageArgs.about, orphanageArgs.instructions, orphanageArgs.opening_hours, orphanageArgs.closing_time, orphanageArgs.open_on_weekends]
    )
    await sut.addImage(files, id)
    const images = await SqlHelper.selectAll(`
    SELECT id, orphanage_id, filename, path, destination, mimetype, size
    FROM photos
    WHERE orphanage_id = (?)`, [id])
    expect(images).toBeTruthy()
  })
})
