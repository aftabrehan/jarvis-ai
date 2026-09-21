import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { jsonError, providerError, validationError } from '@/lib/api-response'
import { createDemoVideo, isDemoFallbackEnabled } from '@/lib/demo-generation'
import {
  asReplicateModel,
  getMediaUrl,
  getReplicate,
} from '@/lib/replicate'
import { checkSubscription } from '@/lib/subscription'
import { videoFormSchema } from '@/schemas'

const defaultVideoModel =
  'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return jsonError('Unauthorized.', 401)

    const parsed = videoFormSchema.safeParse(await req.json())
    if (!parsed.success) return validationError()

    const [freeTrial, isPro] = await Promise.all([
      checkApiLimit(),
      checkSubscription(),
    ])
    if (!freeTrial && !isPro) return jsonError('Free trial has expired.', 403)

    const replicate = getReplicate()
    if (!replicate) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoVideo(parsed.data.prompt))
        : jsonError('Replicate API token is not configured.', 503)
    }

    let output
    try {
      output = await replicate.run(
        asReplicateModel(process.env.REPLICATE_VIDEO_MODEL ?? defaultVideoModel),
        { input: { prompt: parsed.data.prompt } }
      )
    } catch (error: unknown) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoVideo(parsed.data.prompt))
        : providerError(error)
    }
    const url = getMediaUrl(output)
    if (!url) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoVideo(parsed.data.prompt))
        : jsonError('The model returned no video.', 502)
    }

    if (!isPro) await increaseApiLimit()
    return NextResponse.json({ url })
  } catch (error: unknown) {
    console.error('[VIDEO_ERROR]:', error)
    return jsonError('Unable to generate video right now.', 500)
  }
}
