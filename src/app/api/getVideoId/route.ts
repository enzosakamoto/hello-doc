import { NextRequest, NextResponse } from 'next/server'
import ytdl from 'ytdl-core'

type Body = {
  url: string
}

export async function POST(req: NextRequest) {
  const { url }: Body = await req.json()

  if (!url) {
    return NextResponse.json(
      {
        message: 'URL is required'
      },
      {
        status: 400
      }
    )
  }

  if (!ytdl.validateURL(url)) {
    return NextResponse.json(
      {
        message: 'Invalid Youtube URL'
      },
      {
        status: 400
      }
    )
  }

  try {
    const videoId = ytdl.getURLVideoID(url)

    return NextResponse.json(
      {
        videoId,
        message: 'The video id was fetched successfully'
      },
      {
        status: 200
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message
      },
      {
        status: 500
      }
    )
  }
}
