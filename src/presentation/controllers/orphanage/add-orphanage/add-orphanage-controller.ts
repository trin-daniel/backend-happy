import { Validation } from '../../../protocols/validation'

export class AddOrphanageController {
  constructor (
    private readonly validation: Validation
  ) {}

  handle (req: any): any {
    this.validation.validate(req.body)
  }
}
