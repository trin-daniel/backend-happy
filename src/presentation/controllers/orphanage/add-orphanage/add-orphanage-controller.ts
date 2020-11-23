import { Validation } from '../../../protocols/validation'

export class AddOrphanageController {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (req: any): Promise<any> {
    const error = this.validation.validate(req.body)
    if (error) {
      return {
        statusCode: 400,
        body: error
      }
    }
    return Promise.resolve(null)
  }
}
