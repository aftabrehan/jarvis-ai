import type { PropsWithChildren } from 'react'
import { auth } from '@clerk/nextjs/server'

import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  await auth.protect()

  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
