import { ICategories, IItem, IProdutos } from "@/axios/types"
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
  const [itemsCategory, setItemsCategory] = useState<ICategories[]>([])

  useEffect(() => {
    if (items) {
      setItemsCategory(items.categories || [])
    }
  }, [])
  return (
    <section className="p-2 px-7 flex flex-col gap-4">
      {itemsCategory.map((category) => (
        <Fragment key={category.name_clean}>
          <p className="font-raleway font-medium text-xl text-[#64748B] w-full mb-2">{ category.name }</p>
          <Carousel key={category.name_clean} className="w-full">
            <CarouselContent className="-ml-1">
              {items.values[category.name_clean].map((item: IItem) => (
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
