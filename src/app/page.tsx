/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { toast } from '@/components/ui/use-toast'
import { useVideo } from '@/hooks/useVideo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  videoUrl: z.string().url({
    message: 'Invalid URL'
  })
})

export type FormValues = z.infer<typeof formSchema>

export default function Home() {
  const { getVideoId } = useVideo()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
      const result = await getVideoId(values)
      router.push(`/video/${result.videoId}`)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error fetching video info',
        description: (error as Error).message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    disabled: isLoading,
    defaultValues: {
      videoUrl: ''
    },
    mode: 'onBlur'
  })

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
            A Youtube Video
          </h1>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
            Downloader
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-3/5 flex-col items-center justify-center gap-4"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="https://youtu.be/oycpgemYwVI?si=YKY4oNTI2YMxncAe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="ml-[2px]" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : 'Send'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
