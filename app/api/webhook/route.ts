import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'

import { db } from '@/lib/db'
import { jsonError } from '@/lib/api-response'
import { stripe } from '@/lib/stripe'

const subscriptionPeriodEnd = (subscription: Stripe.Subscription) => {
  const periodEnd = subscription.items.data[0]?.current_period_end
  return periodEnd ? new Date(periodEnd * 1000) : null
}

const subscriptionIdFromInvoice = (invoice: Stripe.Invoice) => {
  const subscription = invoice.parent?.subscription_details?.subscription
  return typeof subscription === 'string' ? subscription : subscription?.id
}

export async function POST(req: NextRequest) {
  const signature = (await headers()).get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature) return jsonError('Missing Stripe signature.', 400)
  if (!webhookSecret) return jsonError('Stripe webhook is not configured.', 503)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      webhookSecret
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid payload.'
    return jsonError(`Webhook error: ${message}`, 400)
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session.metadata?.userId
      const subscriptionId =
        typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription?.id

      if (!userId || !subscriptionId)
        return jsonError('Webhook is missing subscription metadata.', 400)

      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const periodEnd = subscriptionPeriodEnd(subscription)
      const firstItem = subscription.items.data[0]

      if (!periodEnd || !firstItem)
        return jsonError('Stripe subscription has no billing period.', 400)

      await db.userSubscription.upsert({
        where: { userId },
        create: {
          userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId:
            typeof subscription.customer === 'string'
              ? subscription.customer
              : subscription.customer.id,
          stripePriceId: firstItem.price.id,
          stripeCurrentPeriodEnd: periodEnd,
        },
        update: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId:
            typeof subscription.customer === 'string'
              ? subscription.customer
              : subscription.customer.id,
          stripePriceId: firstItem.price.id,
          stripeCurrentPeriodEnd: periodEnd,
        },
      })
    }

    if (event.type === 'invoice.payment_succeeded') {
      const subscriptionId = subscriptionIdFromInvoice(event.data.object)
      if (!subscriptionId) return NextResponse.json({ received: true })

      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const periodEnd = subscriptionPeriodEnd(subscription)
      const firstItem = subscription.items.data[0]

      if (periodEnd && firstItem) {
        await db.userSubscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            stripePriceId: firstItem.price.id,
            stripeCurrentPeriodEnd: periodEnd,
          },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    console.error('[STRIPE_WEBHOOK_ERROR]:', error)
    return jsonError('Unable to process Stripe webhook.', 500)
  }
}
