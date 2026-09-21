'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/loading-spinner'
import { getJson, isApiError } from '@/lib/api-client'

type SubscriptionButtonProps = {
  isPro: boolean
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await getJson<{ url: string }>('/api/stripe')

      window.location.assign(response.url)
    } catch (error: unknown) {
      setIsLoading(false)
      toast.error(isApiError(error) ? error.message : 'Something went wrong.')
      console.error('[BILLING_ERROR]: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      disabled={isLoading}
      aria-disabled={isLoading}
      variant={isPro ? 'default' : 'premium'}
      onClick={onClick}
      className="gap-x-2"
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && !isLoading && <Zap className="h-4 w-4 fill-white" />}
      {isLoading && <LoadingSpinner />}
    </Button>
  )
}
