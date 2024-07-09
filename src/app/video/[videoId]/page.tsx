'use client'

import { VideoCardContent } from '@/components/video-card-content'

export default function Video({ params }: { params: { videoId: string } }) {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <VideoCardContent videoId={params.videoId} />
    </main>
  )
}
