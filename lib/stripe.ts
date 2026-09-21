import Stripe from 'stripe'

export const stripe = new Stripe(
  process.env.STRIPE_API_SECRET_KEY ?? 'sk_test_not_configured',
  {
  apiVersion: '2026-08-26.dahlia',
  }
)
