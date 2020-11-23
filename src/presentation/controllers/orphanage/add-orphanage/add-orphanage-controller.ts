import { Validation } from '../../../protocols/validation'

export class AddOrphanageController {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (req: any): Promise<any> {
    this.validation.validate(req.body)
    return Promise.resolve(null)
  }
}
