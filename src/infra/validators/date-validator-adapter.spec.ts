import { TimeValidatorAdapter } from '@infra/validators/date-validator-adapter'
import { random } from 'faker'

type SutTypes = { sut: TimeValidatorAdapter }

const makeSut = (): SutTypes => {
  const sut = new TimeValidatorAdapter()
  return {
    sut
  }
}

describe('Time Validator Adapter', () => {
  test('Should be able to return false if the validator returns false', () => {
    const { sut } = makeSut()
    const value = random.word()
    const isDate = sut.isTime(value)
    expect(isDate).toBe(false)
  })

  test('Should be able to return true if the validator returns true', () => {
    const { sut } = makeSut()
    const value = '00:55:59'
    const isDate = sut.isTime(value)
    expect(isDate).toBe(true)
  })
})
