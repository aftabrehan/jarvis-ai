import Image from 'next/image'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col items-center justify-center gap-y-8 h-full">
    <Link href="/dashboard" className="flex items-center">
      <div className="relative w-8 h-8 mr-4">
        <Image src="/logo.png" alt="Jarvis logo" fill sizes="32px" />
      </div>
      <h1 className="text-2xl font-bold">Jarvis</h1>
    </Link>
    {children}
  </div>
)

export default AuthLayout
