import { badRequest } from '../../../helpers/http-helpers'
import { Validation } from '../../../protocols/validation'

export class AddOrphanageController {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (req: any): Promise<any> {
    const error = this.validation.validate(req.body)
    if (error) {
      return badRequest(error)
    }
    return Promise.resolve(null)
  }
}
