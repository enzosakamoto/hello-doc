import { FormValues } from '@/app/page'

type GetVideoIdResponse = {
  videoId?: string
  message: string
}

export type GetVideoInfoResponse = {
  video?: {
    title: string
    publishDate: string
    author: string
    iframe: string
    thumbnail: string
  }
  message: string
}

type CreateVideoResponse = {
  success: boolean
  message: string
}

export const useVideo = () => {
  const getVideoId = async (values: FormValues) => {
    const res = await fetch('/api/getVideoId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: values.videoUrl
      })
    })
    const result: GetVideoIdResponse = await res.json()
    if (!res.ok) {
      throw new Error(`Erro: ${result.message}`)
    }
    return result
  }

  const getVideoInfo = async (videoId: string) => {
    const res = await fetch('/api/getVideoInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoId
      })
    })
    const result: GetVideoInfoResponse = await res.json()
    if (!res.ok) {
      throw new Error(`Erro: ${result.message}`)
    }
    return result
  }

  const createVideo = async (videoId: string, quality: string) => {
    const res = await fetch('/api/createVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoId,
        quality
      })
    })
    const result: CreateVideoResponse = await res.json()
    if (!res.ok) {
      throw new Error(`Erro: ${result.message}`)
    }
    return result
  }

  return {
    getVideoId,
    getVideoInfo,
    createVideo
  }
}
