import { NextResponse } from 'next/server'

export const jsonError = (error: string, status: number) =>
  NextResponse.json({ error }, { status })

export const validationError = () => jsonError('Invalid request body.', 400)

export const providerError = (error: unknown) => {
  const status =
    error &&
    typeof error === 'object' &&
    'status' in error &&
    typeof error.status === 'number'
      ? error.status
      : undefined

  if (status === 401 || status === 403)
    return jsonError('The AI provider credentials are invalid or expired.', 503)
  if (status === 429)
    return jsonError('The AI provider quota has been reached. Try again later.', 503)

  return jsonError('The AI provider is temporarily unavailable.', 502)
}
