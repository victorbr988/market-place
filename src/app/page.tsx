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
  const [category, setCategory] = useState<string>("todos")

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

  function handleUpdateCategorySelected(event: any) {
    setCategory(event.target.name)
  }

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
            <section className="flex flex-col items-center justify-center mt-8 flex-wrap gap-8">
              <section className=" flex w-full max-w-[800px] items-center space-x-2 px-7">
                <Input type="text" className="border-gray-200 h-12" placeholder="Nome do produto ou serviço..." />
                <Button type="button" className=" flex gap-2 h-12">Buscar <FiSearch /></Button>
              </section>

              <section className="flex gap-2 w-full overflow-x-auto items-center md:overflow-hidden px-3 md:px-7 mt-3 md:mt-0">
                <p className="pr-4 py-2 border-r-gray-500 border-[1px]">Categorias</p>
                {
                  items.produtos?.categories.map((categoryName) => (
                    <Button 
                      name={categoryName} 
                      type="button" 
                      variant={categoryName === category ? 'default' : 'ghost'}
                      className="border-[1px] border-gray-500 flex gap-2"
                      onClick={(event) => handleUpdateCategorySelected(event)}
                    >
                      { categoryName }
                    </Button>
                  ))
                }
                 <Button
                    type="button" 
                    name="todos"
                    variant={category === "todos" ? 'default' : 'ghost'}
                    className="border-[1px] border-gray-500 flex gap-2"
                    onClick={(event) => handleUpdateCategorySelected(event)}
                  >
                    Todos
                  </Button>
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
