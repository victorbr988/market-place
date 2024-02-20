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
import { getItems } from "@/axios/requests/items/getItems";
import { IBaseGroupItems, ICategories, IGetItemsQuery } from "@/axios/types";
import { getCategories } from "@/axios/requests/categories/getCategories";
import { CategoriesSkeleton } from "@/components/custom/skeleton/categoriesPageSkeleton";
import { EmptyData } from "@/components/custom/EmptyData";

export default function Home() {
  const { isLoading, setIsLoading } = Context.loadingStore()
  const [items, setItems] = useState<IBaseGroupItems>({} as IBaseGroupItems)
  const [categoryName, setCategory] = useState<string>("todos")
  const [filters, setFilters] = useState<IGetItemsQuery>({
    search: '',
    category: ''
  })
  const [categories, setCategories] = useState<ICategories[]>([])

  function getAllItems(filter?: IGetItemsQuery) {
    getItems(filter)
      .then((response: any) => {
        setItems(response.data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getCategories().then((response) => setCategories(response.categories))
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getAllItems(filters )
  }, [categoryName])   

  function handleUpdateCategorySelected(event: any) {
    setCategory(event.target.name)
    if (event.target.name !== 'todos') {
      setFilters((prevState) => {
        return {
          ...prevState,
          category: event.target.name
        }
      })
      return;
    } 
    setFilters((prevState) => {
      return {
        ...prevState,
        category: ""
      }
    })
  }

  function handleUpdateSearch(event: any) {
    setFilters((prevState) => {
      return {
        ...prevState,
        search: event.target.value
      }
    })
  }

  function submitSearchItems() {
    setIsLoading(true)
    getAllItems(filters)
    setFilters((prevState) => {
      return {
        ...prevState,
        search: '',
      }
    })
  }

  function countRegistersFromAPI() {
    return [items.products].flat().length
  }

  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Página inicial</p>
          <section>
            <AvatarProfile />
          </section>  
        </section>
      </HeaderMenu>

      <section className="flex flex-col items-center justify-center mt-8 flex-wrap gap-8">
        <section className=" flex w-full max-w-[800px] items-center space-x-2 px-7">
          <Input value={filters.search} onChange={(event) => handleUpdateSearch(event)} type="text" className="border-gray-200 h-12" placeholder="Nome do produto ou serviço..." />
          <Button onClick={submitSearchItems} type="button" className="flex gap-2 h-12">Buscar <FiSearch /></Button>
        </section>

        <section className="flex gap-2 w-full overflow-x-auto items-center md:overflow-hidden px-3 md:px-7 mt-3 md:mt-0 pb-4 md:pb-0">
          <p className="pr-4 py-2 border-r-gray-500 border-[1px]">Categorias</p>

          <ViewControl 
            isLoading={isLoading && categories.length <= 0}
            PageContent={
              categories.map((categoryGroup: ICategories) => (
                <Button 
                  key={categoryGroup.id}
                  name={categoryGroup.name_clean} 
                  type="button" 
                  variant={categoryGroup.name_clean === categoryName ? 'default' : 'ghost'}
                  className="border-[1px] border-gray-500 flex gap-2"
                  onClick={(event) => handleUpdateCategorySelected(event)}
                >
                  { categoryGroup.name }
                </Button>
              ))
            }
            Fallback={
              <CategoriesSkeleton />
            }
          />
          
          <Button
            type="button" 
            name="todos"
            variant={categoryName === "todos" ? 'default' : 'ghost'}
            className="border-[1px] border-gray-500 flex gap-2"
            onClick={(event) => handleUpdateCategorySelected(event)}
          >
            Todos
          </Button>
        </section>
      </section>

      <section className="mt-8">
        <ViewControl 
          isLoading={isLoading}
          totalRegisters={countRegistersFromAPI()}
          EmptyComponent={
            <EmptyData customMessage="Não foram encontrados registros" />
          }
          PageContent={
            <CarouselItems items={items.products} />
          }
          Fallback={
            <ItemsPageSkeleton />
          }
        />
      </section>
    </Fragment>
  )
}
