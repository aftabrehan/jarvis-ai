import { auth } from '@clerk/nextjs/server'

import { MAX_FREE_COUNTS } from '@/constants'

import { db } from './db'

export const increaseApiLimit = async () => {
  const { userId } = await auth()

  if (!userId) return

  await db.userApiLimit.upsert({
    where: { userId },
    create: { userId, count: 1 },
    update: { count: { increment: 1 } },
  })
}

export const checkApiLimit = async () => {
  const { userId } = await auth()

  if (!userId) return false

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  return !userApiLimit || userApiLimit.count < MAX_FREE_COUNTS
}

export const getApiLimitCount = async () => {
  const { userId } = await auth()

  if (!userId) return 0

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (!userApiLimit) return 0

  return userApiLimit.count
}
