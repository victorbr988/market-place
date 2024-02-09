"use client"

import { AvatarProfile } from "@/components/custom/Avatar"
import { HeaderMenu } from "@/components/custom/Header"
import { Fragment, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CardItem } from "@/components/custom/CardItem";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { FiBell, FiEdit2 } from "react-icons/fi"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Profile() {
  const [numberNotifications, setNumberNotifications] = useState<number>(0)
  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Meus perfil</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <section className="px-5 pt-10 flex">
        <AvatarProfile username="Victor" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="hover:bg-transparent"> <FiEdit2 /> </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Editar perfil</SheetTitle>
              <SheetDescription>
                Se você alterar as informações presentes atualmente, isso terá impacto na visualização
              </SheetDescription>
            </SheetHeader>
            <section className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="email" className="text-right">
                  E-mail
                </Label>
                <Input id="email" value="victor@gmail.com" className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input id="phone" value="(81) 99671-7343" className="col-span-3" />
              </div>
            </section>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Salvar alterações</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <section className="w-full relative flex justify-end items-center">
          <FiBell className="h-5 w-5 mr-2" />
          <div className={cn("bg-red-900 absolute top-1 right-1 text-[9px] flex justify-center items-center text-white rounded-full", [
            numberNotifications > 0 ? 'h-4 w-4' : 'h-2 w-2'
          ])}>
            {numberNotifications > 0 ? numberNotifications : ''}
          </div>
        </section>
      </section>
      <Badge className="mt-3 mx-5 text-white bg-gray-600 hover:bg-gray-600" variant="secondary">Vendedor</Badge>

      <section className="px-5 pt-8">
        <Accordion defaultValue={["adverts", "myData"]} type="multiple" className="w-full">
          <AccordionItem className="border-gray-400" defaultValue="1" value="adverts">
            <AccordionTrigger>Anúncios</AccordionTrigger>
            <AccordionContent className="px-7">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/6">
                      <CardItem />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-gray-400" value="myData">
            <AccordionTrigger>
              Meus Dados
            </AccordionTrigger>
            <AccordionContent className="px-7">
              <section className="flex flex-col gap-4 py-4">
                <div>
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input id="name" disabled value="Pedro Duarte" className="col-span-3 bg-black text-white" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-right">
                    E-mail
                  </Label>
                  <Input id="email" disabled value="victor@gmail.com" className="col-span-3 bg-black text-white" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-right">
                    Telefone
                  </Label>
                  <Input id="phone" disabled value="(81) 99671-7343" className="col-span-3 bg-black text-white" />
                </div>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </Fragment>
  )
}