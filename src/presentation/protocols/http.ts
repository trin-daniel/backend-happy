export type HttpRequest<T> = {
  body: T
}

export type HttpResponse<R> = {
  statusCode: number,
  body?: R
}
