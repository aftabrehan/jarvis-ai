import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const absoluteUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_APP_URL}${path}`
