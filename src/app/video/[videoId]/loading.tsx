import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export default function VideoSkeleton() {
  return (
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
  )
}
