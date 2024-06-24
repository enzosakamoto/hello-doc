'use client'

import { Flex, Button, Heading, TextField, Spinner } from '@radix-ui/themes'
import { Header } from './components/Header'
import { FormEvent, useRef, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    setIsLoading(false)
    const url = inputRef.current?.value
    alert(url)
  }

  return (
    <>
      <Header />
      <Flex direction="column" gap="9" mt="9">
        <Flex direction="column">
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
