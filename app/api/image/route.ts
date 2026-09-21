import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { jsonError, providerError, validationError } from '@/lib/api-response'
import { createDemoImage, isDemoFallbackEnabled } from '@/lib/demo-generation'
import { getOpenAI } from '@/lib/openai'
import { checkSubscription } from '@/lib/subscription'
import { imageFormSchema } from '@/schemas'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return jsonError('Unauthorized.', 401)

    const parsed = imageFormSchema.safeParse(await req.json())
    if (!parsed.success) return validationError()

    const [freeTrial, isPro] = await Promise.all([
      checkApiLimit(),
      checkSubscription(),
    ])
    if (!freeTrial && !isPro) return jsonError('Free trial has expired.', 403)

    const createDemoImages = () =>
      Array.from({ length: Number(parsed.data.amount) }, (_, index) =>
        createDemoImage(`${parsed.data.prompt} ${index + 1}`)
      )
    const openai = getOpenAI()
    if (!openai) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoImages())
        : jsonError('OpenAI API key is not configured.', 503)
    }

    let response
    try {
      response = await openai.images.generate({
        model: process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-1-mini',
        prompt: parsed.data.prompt,
        n: Number(parsed.data.amount),
        size: parsed.data.resolution,
        output_format: 'png',
      })
    } catch (error: unknown) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoImages())
        : providerError(error)
    }

    const images = (response.data ?? [])
      .map(image =>
        image.b64_json
          ? { url: `data:image/png;base64,${image.b64_json}` }
          : image.url
            ? { url: image.url }
            : null
      )
      .filter((image): image is { url: string } => image !== null)

    if (!images.length) {
      return isDemoFallbackEnabled()
        ? NextResponse.json(createDemoImages())
        : jsonError('The model returned no images.', 502)
    }
    if (!isPro) await increaseApiLimit()

    return NextResponse.json(images)
  } catch (error: unknown) {
    console.error('[IMAGE_ERROR]:', error)
    return jsonError('Unable to generate images right now.', 500)
  }
}
