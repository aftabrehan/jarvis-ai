'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
import { useAuth } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const font = Montserrat({ weight: '600', subsets: ['latin'] })

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image src="/logo.png" alt="Jarvis logo" fill />
        </div>

        <h1 className={cn('text-2xl font-bold text-white', font.className)}>
          Jarvis
        </h1>
      </Link>

      <Button className="rounded-full gap-x-1" asChild>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          {isSignedIn ? 'Go to Dashboard' : 'Get started'}
          <ArrowRight />
        </Link>
      </Button>
    </nav>
  )
}
