"use client"

import { HeaderMenu } from "@/components/custom/Header";
import { Fragment, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { FiSearch } from "react-icons/fi";
import { CarouselItems } from "@/components/custom/Carousel";
import { CardItem } from "@/components/custom/CardItem";
import { Context } from "@/state/zustandContext";
import { ViewControl } from "@/components/custom/ViewControl";
import { ItemsPageSkeleton } from "@/components/custom/skeleton/ItemsPageSkeleton";
import { AvatarProfile } from "@/components/custom/Avatar";

export default function Home() {
  const isLoading = Context.loadingStore((state) => state.isLoading)
  const setIsLoading = Context.loadingStore((state) => state.setIsLoading)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <Fragment>
      <HeaderMenu>
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Produtos</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <ViewControl
        isLoading={isLoading}
        PageContent={
          <Fragment>
            <section className="flex items-center mt-8 flex-wrap gap-3">
              <section className=" flex w-full max-w-lg items-center space-x-2 border-r-[1px] border-gray-400 px-6">
                <Input type="text" className="border-gray-200" placeholder="Nome do produto..." />
                <Button type="button" className=" flex gap-2">Buscar <FiSearch /></Button>
              </section>

              <section className="flex gap-2 overflow-x-auto md:overflow-hidden px-3 md:px-0 mt-3 md:mt-0">
                <Button type="button" className=" flex gap-2">Categoria 1</Button>
                <Button type="button" className=" flex gap-2">Categoria 2</Button>
                <Button type="button" className=" flex gap-2">Categoria 3</Button>
                <Button type="button" className=" flex gap-2">Categoria 4</Button>
                <Button type="button" className=" flex gap-2">Categoria 5</Button>
              </section>
            </section>

            <section className="mt-8">
              <CarouselItems>
                <CardItem />
              </CarouselItems>
            </section>
          </Fragment>
        }
        Fallback={
          <ItemsPageSkeleton />
        }
      />
    </Fragment>
   
  )
}
