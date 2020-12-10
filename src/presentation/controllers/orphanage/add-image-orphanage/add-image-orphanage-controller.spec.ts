import { AddImageOrphanageController } from '@presentation/controllers/orphanage/add-image-orphanage/add-image-orphanage-controller'
import { HttpRequest } from '@presentation/protocols'
import { Image, Orphanage } from '@domain/models/orphanage'
import { LoadOneOrphanage } from '@domain/use-cases/orphanage/load-one-orphanage'
import { random, system, internet, address } from 'faker/locale/pt_BR'

const photo = (): Image => ({ id: random.uuid(), filename: system.fileName(), path: system.filePath(), destination: system.directoryPath(), mimetype: system.mimeType(), size: 256 })
const mockRequest: HttpRequest<any> = {
  body: {},
  params: {
    orphanage_id: random.uuid()
  },
  files: [photo(), photo()]
}

const mockOrphanage = {
  id: random.uuid(),
  name: internet.userName(),
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  about: random.words(5),
  instructions: random.words(5),
  opening_hours: '00:38:36',
  closing_time: '14:38:36',
  open_on_weekends: random.boolean(),
  photos: [photo(), photo()]
}

const mockLoadOneOrphanage = (): LoadOneOrphanage => {
  class LoadOneOrphanageSpy implements LoadOneOrphanage {
    async loadById (id: string): Promise<Orphanage> {
      return Promise.resolve(mockOrphanage)
    }
  }
  return new LoadOneOrphanageSpy()
}

describe('Add Image Orphanage Controller', () => {
  test('Should be able to call LoadOneOrphanage with correct value', async () => {
    const loadOneOrphanageSpy = mockLoadOneOrphanage()
    const sut = new AddImageOrphanageController(loadOneOrphanageSpy)
    const loadById = jest.spyOn(loadOneOrphanageSpy, 'loadById')
    const request = mockRequest
    await sut.handle(request)
    expect(loadById).toHaveBeenCalledWith(request.params.orphanage_id)
  })
})
