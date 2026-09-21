export class ApiError extends Error {
  readonly status: number
  readonly details: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

const parseResponse = async (response: Response): Promise<unknown> => {
  if (response.status === 204) return undefined

  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) return response.json()

  const text = await response.text()
  return text || undefined
}

const errorMessage = (body: unknown, fallback: string) => {
  if (typeof body === 'string' && body.trim()) return body
  if (
    body &&
    typeof body === 'object' &&
    'error' in body &&
    typeof body.error === 'string'
  ) {
    return body.error
  }

  return fallback
}

export const requestJson = async <T>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<T> => {
  const headers = new Headers(init.headers)
  const hasBody = init.body !== undefined && init.body !== null

  if (hasBody && !headers.has('content-type')) {
    headers.set('content-type', 'application/json')
  }
  headers.set('accept', 'application/json')

  const response = await fetch(input, { ...init, headers })
  const body = await parseResponse(response)

  if (!response.ok) {
    throw new ApiError(
      errorMessage(body, `Request failed with status ${response.status}.`),
      response.status,
      body
    )
  }

  return body as T
}

export const getJson = <T>(input: RequestInfo | URL, init?: RequestInit) =>
  requestJson<T>(input, { ...init, method: 'GET' })

export const postJson = <T>(
  input: RequestInfo | URL,
  body: unknown,
  init?: RequestInit
) =>
  requestJson<T>(input, {
    ...init,
    method: 'POST',
    body: JSON.stringify(body),
  })

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError
