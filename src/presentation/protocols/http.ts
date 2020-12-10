export type HttpRequest<T> = {
  body: T,
  params?: any,
  files?: any
}

export type HttpResponse<R> = {
  statusCode: number,
  body?: R
}
