import Replicate, { type FileOutput } from 'replicate'

type ReplicateModel = `${string}/${string}` | `${string}/${string}:${string}`

export const getReplicate = () => {
  const auth = process.env.REPLICATE_API_TOKEN
  return auth ? new Replicate({ auth }) : null
}

export const asReplicateModel = (model: string) => model as ReplicateModel

const isFileOutput = (value: unknown): value is FileOutput =>
  !!value &&
  typeof value === 'object' &&
  'url' in value &&
  typeof value.url === 'function'

export const getMediaUrl = (output: unknown): string | null => {
  if (typeof output === 'string') return output
  if (output instanceof URL) return output.toString()
  if (isFileOutput(output)) return output.url().toString()

  if (Array.isArray(output)) {
    for (const value of output) {
      const url = getMediaUrl(value)
      if (url) return url
    }
    return null
  }

  if (output && typeof output === 'object') {
    for (const key of ['url', 'audio', 'video', 'output']) {
      if (key in output) {
        const url = getMediaUrl((output as Record<string, unknown>)[key])
        if (url) return url
      }
    }
  }

  return null
}
