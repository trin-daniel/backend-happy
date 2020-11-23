import { AddOrphanage } from 'domain/use-cases/orphanage/add-orphanage'
import { badRequest } from '../../../helpers/http-helpers'
import { Validation } from '../../../protocols/validation'

export class AddOrphanageController {
  constructor (
    private readonly validation: Validation,
    private readonly addOrphanage: AddOrphanage
  ) {}

  async handle (req: any): Promise<any> {
    const error = this.validation.validate(req.body)
    if (error) {
      return badRequest(error)
    }
    const orphanage = await this.addOrphanage.add(req.body)
    return {
      statusCode: 200,
      body: orphanage
    }
  }
}
