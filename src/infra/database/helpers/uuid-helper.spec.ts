import { UUIDHelper } from '@infra/database/helpers/uuid-helper'
import { random } from 'faker'
import uuid from 'uuid'

jest.mock('uuid', () => ({
  v4 (): string {
    return random.uuid()
  }
}))

describe('UUID Helper', () => {
  test('Should be able to call the uuid v4 method', () => {
    const sut = new UUIDHelper()
    const v4Spy = jest.spyOn(uuid, 'v4')
    sut.generate()
    expect(v4Spy).toHaveBeenCalled()
  })
})
