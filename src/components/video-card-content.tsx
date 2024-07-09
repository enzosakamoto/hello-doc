'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { GetVideoInfoResponse, useVideo } from '@/hooks/useVideo'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Separator } from './ui/separator'

const formSchema = z.object({
  quality: z.string().min(1, {
    message: 'Select a quality'
  })
})

export type FormQuality = z.infer<typeof formSchema>

export function VideoCardContent({ videoId }: { videoId: string }) {
  const { getVideoInfo, createVideo } = useVideo()
  const router = useRouter()

  const [videoInfo, setVideoInfo] = useState<GetVideoInfoResponse | undefined>()

  const onSubmit = async (values: FormQuality) => {
    console.log(values)
    try {
      const result = await createVideo(videoId, values.quality)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleVideoInfo = async () => {
    try {
      const result = await getVideoInfo(videoId)
      setVideoInfo(result)
    } catch (error) {
      console.log(error)
      router.push('/')
    }
  }

  useEffect(() => {
    handleVideoInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<FormQuality>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quality: ''
    },
    mode: 'onBlur'
  })

  return (
    <>
      {!videoInfo ? (
        <Card className="">
          <CardHeader>
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[320px] w-[540px]" />
          </CardContent>
          <CardFooter className="flex w-full items-center justify-center gap-12">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[100px]" />
          </CardFooter>
        </Card>
      ) : (
        <Card className="">
          <CardHeader>
            <CardTitle>{videoInfo?.video?.title}</CardTitle>
            <CardDescription>{videoInfo?.video?.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <iframe
              src={videoInfo?.video?.iframe}
              title={videoInfo?.video?.title}
              width={540}
              height={320}
              className="rounded-md"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-6">
            <Separator />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full items-center justify-center gap-8"
              >
                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a video quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="highest">
                            Highest quality
                          </SelectItem>
                          <SelectItem value="lowest">Lowest quality</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Download</Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
