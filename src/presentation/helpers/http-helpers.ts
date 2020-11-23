export const ok = (data: any): any => {
  return {
    statusCode: 200,
    body: data
  }
}

export const badRequest = (error: Error): any => {
  return {
    statusCode: 400,
    body: error
  }
}
