import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { jsonError, providerError, validationError } from '@/lib/api-response'
import { createDemoAudio, isDemoFallbackEnabled } from '@/lib/demo-generation'
import {
  asReplicateModel,
  getMediaUrl,
  getReplicate,
} from '@/lib/replicate'
import { checkSubscription } from '@/lib/subscription'
import { musicFormSchema } from '@/schemas'

const defaultMusicModel =
  'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return jsonError('Unauthorized.', 401)

    const parsed = musicFormSchema.safeParse(await req.json())
    if (!parsed.success) return validationError()

    const [freeTrial, isPro] = await Promise.all([
      checkApiLimit(),
      checkSubscription(),
    ])
    if (!freeTrial && !isPro) return jsonError('Free trial has expired.', 403)

    const replicate = getReplicate()
    if (!replicate) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoAudio(parsed.data.prompt))
        : jsonError('Replicate API token is not configured.', 503)
    }

    let output
    try {
      output = await replicate.run(
        asReplicateModel(process.env.REPLICATE_MUSIC_MODEL ?? defaultMusicModel),
        { input: { prompt_a: parsed.data.prompt } }
      )
    } catch (error: unknown) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoAudio(parsed.data.prompt))
        : providerError(error)
    }
    const url = getMediaUrl(output)
    if (!url) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoAudio(parsed.data.prompt))
        : jsonError('The model returned no audio.', 502)
    }

    if (!isPro) await increaseApiLimit()
    return NextResponse.json({ url })
  } catch (error: unknown) {
    console.error('[MUSIC_ERROR]:', error)
    return jsonError('Unable to generate music right now.', 500)
  }
}
