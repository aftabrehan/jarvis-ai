'use client'

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/loading-spinner'

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
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error: unknown) {
      toast.error('Something went wrong.')
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
