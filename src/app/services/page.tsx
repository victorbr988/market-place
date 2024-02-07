import { Menu } from "@/components/custom/Header";
import { Fragment } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { FiSearch } from "react-icons/fi";
import { CarouselItems } from "@/components/custom/Carousel";
import { CardItem } from "@/components/custom/CardItem";

export default function Home() {
  return (
    <Fragment>
      <header className="flex px-4 gap-2 items-center bg-white p-4 shadow-sm">
        <Menu />
        <p className="font-raleway font-medium text-xl">Serviços</p>
      </header>

      <section className="flex items-center mt-8 flex-wrap gap-3">
        <section className=" flex w-full max-w-lg items-center space-x-2 border-r-[1px] border-gray-400 px-6">
          <Input type="text" className="border-gray-200" placeholder="Nome do serviço..." />
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
   
  )
}
