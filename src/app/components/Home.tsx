/* eslint-disable @next/next/no-img-element */
'use client'

import {
  Flex,
  Button,
  Heading,
  TextField,
  Spinner,
  Card,
  Box
} from '@radix-ui/themes'
import { Header } from '../components/Header'
import { FormEvent, useRef, useState } from 'react'

type Response = {
  title?: string
  thumbnail?: string
  message: string
}

export function Home() {
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
      <Header />
      <Flex direction="column" gap="9" mt="9">
        <Flex direction="column" height="300px" justify="center">
          <Heading size="9" align="center">
            A Youtube Video
          </Heading>
          <Heading size="9" mt="4" align="center">
            Downloader
          </Heading>
        </Flex>
        <Flex direction="column" gap="4">
          <TextField.Root
            size="3"
            ref={inputRef}
            placeholder="https://www.youtube.com/watch?v=4Z9vQe5RFXk"
          />
          <Flex justify="center">
            <Button
              size="3"
              variant="soft"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Download'}
            </Button>
          </Flex>
        </Flex>
        {videoInfo && (
          <Box maxWidth="1024px">
            <Card>
              <Flex gap="3" align="center" direction="column">
                <img
                  src={videoInfo?.thumbnail}
                  alt={videoInfo?.title}
                  className="rounded-lg"
                />
                <Button
                  size="3"
                  variant="soft"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Download
                </Button>
              </Flex>
            </Card>
          </Box>
        )}
      </Flex>
    </>
  )
}
