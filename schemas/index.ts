import * as z from 'zod'

export const conversationFormSchema = z.object({
  prompt: z.string().trim().min(1, { message: 'Prompt is required.' }).max(4000),
})

export const codeFormSchema = z.object({
  prompt: z.string().trim().min(1, { message: 'Prompt is required.' }).max(4000),
})

export const imageFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, { message: 'Image prompt is required.' })
    .max(4000),
  amount: z.enum(['1', '2', '3', '4', '5']),
  resolution: z.enum(['1024x1024', '1536x1024', '1024x1536']),
})

export const musicFormSchema = z.object({
  prompt: z.string().trim().min(1, { message: 'Music prompt is required.' }).max(2000),
})

export const videoFormSchema = z.object({
  prompt: z.string().trim().min(1, { message: 'Video prompt is required.' }).max(2000),
})

export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(20_000),
})

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(50),
})
