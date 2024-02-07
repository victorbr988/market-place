import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ReactNode } from "react"

interface ICarouselItems {
  children: ReactNode
}
export function CarouselItems({ children }: ICarouselItems) {
  return (
    <section className="p-2 px-7">
      <p className="font-raleway font-medium text-xl text-[#64748B] w-full mb-2">Category</p>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/6">
              { children }
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
    
  )
}
