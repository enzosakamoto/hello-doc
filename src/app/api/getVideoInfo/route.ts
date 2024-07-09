import { NextRequest, NextResponse } from 'next/server'
import ytdl from 'ytdl-core'

type Body = {
  videoId: string
}

export async function POST(req: NextRequest) {
  const { videoId }: Body = await req.json()

  console.log(videoId)

  if (!videoId) {
    return NextResponse.json(
      {
        message: 'Video ID is required'
      },
      {
        status: 400
      }
    )
  }

  try {
    const videoInfo = await ytdl.getInfo(videoId)

    console.log(videoInfo)
    // console.log(videoInfo.videoDetails.thumbnails)

    return NextResponse.json(
      {
        video: {
          title: videoInfo.videoDetails.title,
          publishDate: videoInfo.videoDetails.publishDate,
          author: videoInfo.videoDetails.author.name,
          iframe: videoInfo.videoDetails.embed.iframeUrl,
          thumbnail:
            videoInfo.videoDetails.thumbnails[
              videoInfo.videoDetails.thumbnails.length - 1
            ].url
        },
        message: 'the video info was fetched successfully'
      },
      {
        status: 200
      }
    )
  } catch (error) {
    if ((error as Error).message.includes('No video id found')) {
      return NextResponse.json(
        {
          message: 'Invalid video ID'
        },
        {
          status: 400
        }
      )
    }
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
