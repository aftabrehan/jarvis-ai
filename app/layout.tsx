import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { siteConfig } from '@/config'
import { CrispProvider } from '@/providers/crisp-provider'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toaster-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = siteConfig

const RootLayout = ({ children }: PropsWithChildren) => (
  <ClerkProvider
    appearance={{
      variables: { colorPrimary: '#6C5BEE' },
      layout: { logoPlacement: 'none' },
    }}
  >
    <html lang="en">
      <CrispProvider />
      <body className={inter.className}>
        <ModalProvider />
        <ToasterProvider />
        {children}
      </body>
    </html>
  </ClerkProvider>
)

export default RootLayout
