import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { siteConfig } from '@/config'
import { CrispProvider } from '@/providers/crisp-provider'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toaster-provider'

import './globals.css'

export const metadata: Metadata = siteConfig

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider
    appearance={{
      variables: { colorPrimary: '#6C5BEE' },
    }}
  >
    <html lang="en">
      <CrispProvider />
      <body className="font-sans">
        <ModalProvider />
        <ToasterProvider />
        {children}
      </body>
    </html>
  </ClerkProvider>
)

export default RootLayout
