export type HttpRequest<T> = {
  body: T,
  params?: any
}

export type HttpResponse<R> = {
  statusCode: number,
  body?: R
}
