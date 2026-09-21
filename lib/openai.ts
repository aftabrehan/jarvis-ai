import OpenAI from 'openai'

let client: OpenAI | undefined

export const getOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  client ??= new OpenAI({ apiKey })
  return client
}
