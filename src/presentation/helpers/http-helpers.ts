export const badRequest = (error: Error): any => {
  return {
    statusCode: 400,
    body: error
  }
}
