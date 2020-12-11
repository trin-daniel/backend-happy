export class InvalidRouteParamError extends Error {
  constructor (name: string) {
    super(`Invalid route parameter ${name}`)
    this.name = 'InvalidRouteParam'
  }
}
