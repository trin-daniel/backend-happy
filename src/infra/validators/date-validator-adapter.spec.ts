import { DateValidatorAdapter } from '@infra/validators/date-validator-adapter'
import { random, time } from 'faker'

type SutTypes = { sut: DateValidatorAdapter }

const makeSut = (): SutTypes => {
  const sut = new DateValidatorAdapter()
  return {
    sut
  }
}

describe('Date Validator Adapter', () => {
  test('Should be able to return false if the validator returns false', () => {
    const { sut } = makeSut()
    const value = random.float()
    const isDate = sut.isDate(value)
    expect(isDate).toBe(false)
  })

  test('Should be able to return true if the validator returns true', () => {
    const { sut } = makeSut()
    const value = time.recent()
    const isDate = sut.isDate(value)
    expect(isDate).toBe(true)
  })
})
