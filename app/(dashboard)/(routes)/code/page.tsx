'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { toast } from 'sonner'
import { Code } from 'lucide-react'

import { BotAvatar } from '@/components/bot-avatar'
import { Empty } from '@/components/empty'
import { DemoNotice } from '@/components/demo-notice'
import { Heading } from '@/components/heading'
import { Loader } from '@/components/loader'
import { UserAvatar } from '@/components/user-avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useProModal } from '@/hooks/use-pro-modal'
import { cn } from '@/lib/utils'
import { isApiError, postJson } from '@/lib/api-client'
import type { ChatMessage } from '@/lib/chat'
import { codeFormSchema } from '@/schemas'

const CodePage = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { prompt: '' },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof codeFormSchema>) => {
    try {
      const userMessage: ChatMessage = {
        role: 'user',
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage]

      const response = await postJson<ChatMessage>('/api/code', {
        messages: newMessages,
      })

      setMessages(current => [...current, userMessage, response])
    } catch (error: unknown) {
      if (isApiError(error) && error.status === 403)
        proModal.onOpen()
      else toast.error(isApiError(error) ? error.message : 'Something went wrong.')

      console.error(error)
    } finally {
      form.reset()
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            autoCapitalize="off"
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      aria-disabled={isLoading}
                      placeholder="Simple toggle button using React hooks."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>

        {messages.some(message => message.demo) && <DemoNotice />}

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}-${message.content}`}
                className={cn(
                  'p-8 w-full flex items-start gap-x-8 rounded-lg',
                  message.role === 'user'
                    ? 'bg-white border border-black/10'
                    : 'bg-muted'
                )}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <div className="min-w-0 flex-1 text-sm">
                  <ReactMarkdown
                    components={{
                      pre: ({ children }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre>{children}</pre>
                        </div>
                      ),
                      code: ({ children, className }) => (
                        <code className={cn('bg-black/10 rounded-lg p-1', className)}>
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodePage
