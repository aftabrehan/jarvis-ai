// This file is needed to support autocomplete for process.env
export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string

      REPLICATE_API_TOKEN: string

      DATABASE_URL: string

      STRIPE_API_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string

      NEXT_PUBLIC_APP_URL: string

      NEXT_PUBLIC_CRISP_WEBSITE_ID: string
    }
  }
}
