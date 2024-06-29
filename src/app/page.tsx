/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import { FormEvent, useRef, useState } from 'react'

type Response = {
  title?: string
  thumbnail?: string
  message: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<{
    title: string
    thumbnail: string
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/getVideoInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: inputRef.current?.value
        })
      })
      const result: Response = await res.json()
      if (!res.ok) {
        throw new Error(`Erro: ${result.message}`)
      }
      setVideoInfo({ title: result.title!, thumbnail: result.thumbnail! })
    } catch (error) {
      console.log('as')
      alert((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex h-[120rem] w-full flex-col items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          A Youtube Video Downloader
        </h1>
        <Button>Click me</Button>
      </div>
    </>
  )
}
