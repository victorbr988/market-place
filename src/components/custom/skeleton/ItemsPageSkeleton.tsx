import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { CardItemSkeleton } from "./CardItemSkeleton"

export function ItemsPageSkeleton() {
  return (
    <section className="p-2 px-7 flex flex-col gap-12">
      <section>
        <Skeleton className="font-raleway font-medium text-xl h-[14px] w-[120px] bg-gray-600 rounded-xl text-[#64748B] mb-4"></Skeleton>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
           <CardItemSkeleton />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section>
        <Skeleton className="font-raleway font-medium text-xl h-[14px] w-[120px] bg-gray-600 rounded-xl text-[#64748B] mb-4"></Skeleton>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            <CardItemSkeleton />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </section>
  )
}