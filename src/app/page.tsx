"use client"

import { HeaderMenu } from "@/components/custom/Header";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { FiSearch } from "react-icons/fi";
import { CarouselItems } from "@/components/custom/Carousel";
import { AvatarProfile } from "@/components/custom/Avatar";
import { Context } from "@/state/zustandContext";
import { ItemsPageSkeleton } from "@/components/custom/skeleton/ItemsPageSkeleton";
import { ViewControl } from "@/components/custom/ViewControl";
import toast from "react-hot-toast";
import { getItems } from "@/axios/requests/getItems";
import { IBaseGroupItems } from "@/axios/types";

export default function Home() {
  const { isLoading, setIsLoading } = Context.loadingStore()
  const [items, setItems] = useState<IBaseGroupItems>({} as IBaseGroupItems)

  function getAllItems() {
    toast.promise(
      getItems(),
      {
        loading: "Buscando...",
        success: (itemsResponse: any) => {
          setItems(itemsResponse.data)
          setIsLoading(false)
          return "Sucesso ao encontrar os items"
        },
        error: () => {
          setIsLoading(false)
          return "Algo deu errado"
        } 
      }
    )
  }

  useEffect(() => {
    setIsLoading(true)
    getAllItems()
  }, [])

  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Página inicial</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <ViewControl
        isLoading={isLoading}
        PageContent={
          <Fragment>
            <section className="flex items-center mt-8 flex-wrap gap-3">
              <section className=" flex w-full max-w-lg items-center space-x-2 border-r-[1px] border-gray-400 px-6">
                <Input type="text" className="border-gray-200" placeholder="Nome do produto ou serviço..." />
                <Button type="button" className=" flex gap-2">Buscar <FiSearch /></Button>
              </section>

              <section className="flex gap-2 overflow-x-auto md:overflow-hidden px-3 md:px-7 mt-3 md:mt-0">
                <Button type="button" className=" flex gap-2">Categoria 1</Button>
                <Button type="button" className=" flex gap-2">Categoria 2</Button>
                <Button type="button" className=" flex gap-2">Categoria 3</Button>
                <Button type="button" className=" flex gap-2">Categoria 4</Button>
                <Button type="button" className=" flex gap-2">Categoria 5</Button>
              </section>
            </section>

            <section className="mt-8">
              <CarouselItems items={items.produtos} />
            </section>
          </Fragment>
        }
        Fallback= {
          <ItemsPageSkeleton />
        }
      />      
    </Fragment>
  )
}
