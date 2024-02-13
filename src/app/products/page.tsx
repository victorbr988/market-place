"use client"

import { HeaderMenu } from "@/components/custom/Header";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { FiSearch } from "react-icons/fi";
import { CarouselItems } from "@/components/custom/Carousel";
import { Context } from "@/state/zustandContext";
import { ViewControl } from "@/components/custom/ViewControl";
import { ItemsPageSkeleton } from "@/components/custom/skeleton/ItemsPageSkeleton";
import { AvatarProfile } from "@/components/custom/Avatar";
import { IBaseGroupItems } from "@/axios/types";
import toast from "react-hot-toast";
import { getItems } from "@/axios/requests/getItems";

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

              <section className="flex gap-2 overflow-x-auto md:overflow-hidden px-3 md:px-7 mt-3 md:mt-0">
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
        Fallback={
          <ItemsPageSkeleton />
        }
      />
    </Fragment>
   
  )
}
