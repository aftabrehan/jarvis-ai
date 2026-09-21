import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'
import { jsonError } from '@/lib/api-response'

const settingsUrl = absoluteUrl('/settings')

export async function GET() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) return jsonError('Unauthorized.', 401)
    if (!process.env.STRIPE_API_SECRET_KEY)
      return jsonError('Stripe is not configured.', 503)

    const email =
      user.primaryEmailAddress?.emailAddress ??
      user.emailAddresses[0]?.emailAddress
    if (!email) return jsonError('Your account needs an email address.', 400)

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId,
      },
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      return NextResponse.json({ url: stripeSession.url })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: email,
      subscription_data: {
        metadata: { userId },
      },
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Jarvis Pro',
              description: 'Unlimited AI Generations.',
            },
            unit_amount: 2000, // $20
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    })

    if (!stripeSession.url)
      return jsonError('Stripe did not return a checkout URL.', 502)

    return NextResponse.json({ url: stripeSession.url })
  } catch (error: unknown) {
    console.error('[STRIPE_ERROR]: ', error)
    return jsonError('Unable to open billing right now.', 500)
  }
}
