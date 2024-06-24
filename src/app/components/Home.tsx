'use client'

import { Flex, Button, Heading, TextField, Spinner } from '@radix-ui/themes'
import { Header } from '../components/Header'
import { FormEvent, useRef, useState } from 'react'

export function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/validateUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: inputRef.current?.value
        })
      })
      const result = await res.json()
      alert(result.message)
    } catch (error) {
      setIsLoading(false)
      alert((error as Error).message)
      return
    }
    setIsLoading(false)
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
      </Flex>
    </>
  )
}
