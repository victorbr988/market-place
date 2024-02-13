import { IItem, IProdutos } from "@/axios/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Fragment, useEffect, useState } from "react"
import { CardItem } from "./CardItem"

interface ICarouselItems {
  items: IProdutos
}
export function CarouselItems({ items }: ICarouselItems) {
  const [itemsCategory, setItemsCategory] = useState<string[]>([])
  const valuesPerKey = Object.keys(items?.values ?? [])

  useEffect(() => {
    if (items) {
      setItemsCategory(items.categories || [])
    }
  })
  return (
    <section className="p-2 px-7 flex flex-col gap-4">
      {itemsCategory.map((category, index) => (
        <Fragment key={category}>
          <p className="font-raleway font-medium text-xl text-[#64748B] w-full mb-2">{ category }</p>
          <Carousel key={category} className="w-full">
            <CarouselContent className="-ml-1">
              {items.values[valuesPerKey[index]].map((item: IItem) => (
                <CarouselItem key={ item.id } className="pl-1 md:basis-1/2 lg:basis-1/6">
                  <section>
                    <CardItem item={item} />
                  </section>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Fragment>
      ))}
      
    </section>
    
  )
}
