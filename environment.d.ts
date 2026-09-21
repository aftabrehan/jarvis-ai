// This file is needed to support autocomplete for process.env
export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENABLE_DEMO_FALLBACK?: string

      OPENAI_API_KEY?: string
      OPENAI_TEXT_MODEL?: string
      OPENAI_IMAGE_MODEL?: string

      REPLICATE_API_TOKEN?: string
      REPLICATE_VIDEO_MODEL?: string
      REPLICATE_MUSIC_MODEL?: string

      DATABASE_URL?: string

      STRIPE_API_SECRET_KEY?: string
      STRIPE_WEBHOOK_SECRET?: string

      NEXT_PUBLIC_APP_URL?: string

      NEXT_PUBLIC_CRISP_WEBSITE_ID?: string
    }
  }
}
