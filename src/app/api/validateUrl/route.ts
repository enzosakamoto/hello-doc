import { NextRequest, NextResponse } from 'next/server'
import ytdl from 'ytdl-core'

type Body = {
  url: string
}

export async function POST(req: NextRequest) {
  const { url }: Body = await req.json()

  if (!ytdl.validateURL(url)) {
    return NextResponse.json(
      {
        message: 'Invalid URL'
      },
      {
        status: 400
      }
    )
  }

  return NextResponse.json(
    {
      message: 'Valid URL'
    },
    {
      status: 200
    }
  )
}

export async function GET() {
  return NextResponse.json({
    message: 'Hello, world!'
  })
}
