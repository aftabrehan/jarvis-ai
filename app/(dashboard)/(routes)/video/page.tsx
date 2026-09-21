'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { VideoIcon } from 'lucide-react'

import { Empty } from '@/components/empty'
import { DemoNotice } from '@/components/demo-notice'
import { Heading } from '@/components/heading'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useProModal } from '@/hooks/use-pro-modal'
import { videoFormSchema } from '@/schemas'
import { isApiError, postJson } from '@/lib/api-client'

type GeneratedVideo = {
  url: string | null
  demo?: boolean
  prompt?: string
}

const VideoPage = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [video, setVideo] = useState<GeneratedVideo>()

  const form = useForm<z.infer<typeof videoFormSchema>>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: { prompt: '' },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof videoFormSchema>) => {
    try {
      setVideo(undefined)

      const response = await postJson<GeneratedVideo>('/api/video', values)

      setVideo(response)
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
        title="Video Generation"
        description="Turn your prompt into video."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />

      <div className="px-4 lg:px-8">
        <div className="">
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
                        placeholder="Clown fish swimming around a coral reef."
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
        </div>

        {video?.demo && <DemoNotice />}

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && <Empty label="No video generated." />}

          {video?.url && (
            <video
              className="w-full aspect-video mt-8 rounded-lg border bg-black"
              controls
            >
              <source src={video.url} />
            </video>
          )}

          {video?.demo && (
            <div className="relative mt-8 flex aspect-video w-full overflow-hidden rounded-lg border bg-gradient-to-br from-orange-500 via-purple-600 to-indigo-950 p-8 text-white shadow-lg">
              <div className="absolute -left-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -right-16 h-80 w-80 animate-pulse rounded-full bg-white/10" />
              <div className="relative z-10 m-auto max-w-xl text-center">
                <VideoIcon className="mx-auto mb-4 h-12 w-12" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  Jarvis demo sequence
                </p>
                <p className="mt-3 text-xl font-semibold">
                  {video.prompt || 'Generated video preview'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPage
