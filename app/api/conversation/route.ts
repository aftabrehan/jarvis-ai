import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { jsonError, providerError, validationError } from '@/lib/api-response'
import {
  createDemoConversation,
  isDemoFallbackEnabled,
} from '@/lib/demo-generation'
import { getOpenAI } from '@/lib/openai'
import { checkSubscription } from '@/lib/subscription'
import { chatRequestSchema } from '@/schemas'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return jsonError('Unauthorized.', 401)

    const parsed = chatRequestSchema.safeParse(await req.json())
    if (!parsed.success) return validationError()

    const [freeTrial, isPro] = await Promise.all([
      checkApiLimit(),
      checkSubscription(),
    ])
    if (!freeTrial && !isPro) return jsonError('Free trial has expired.', 403)

    const prompt = parsed.data.messages.at(-1)?.content ?? ''
    const openai = getOpenAI()
    if (!openai) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoConversation(prompt))
        : jsonError('OpenAI API key is not configured.', 503)
    }

    let response
    try {
      response = await openai.chat.completions.create({
        model: process.env.OPENAI_TEXT_MODEL ?? 'gpt-4.1-mini',
        messages: parsed.data.messages,
      })
    } catch (error: unknown) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoConversation(prompt))
        : providerError(error)
    }
    const content = response.choices[0]?.message.content
    if (!content) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoConversation(prompt))
        : jsonError('The model returned an empty response.', 502)
    }

    if (!isPro) await increaseApiLimit()

    return NextResponse.json({ role: 'assistant', content })
  } catch (error: unknown) {
    console.error('[CONVERSATION_ERROR]:', error)
    return jsonError('Unable to generate a response right now.', 500)
  }
}
