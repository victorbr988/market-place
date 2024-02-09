"use client"

import { AvatarProfile } from "@/components/custom/Avatar"
import { HeaderMenu } from "@/components/custom/Header"
import { Fragment } from "react"
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
import { FiEdit2 } from "react-icons/fi"
import { Badge } from "@/components/ui/badge"

export default function Profile() {
  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Página inicial</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <section className="px-5 pt-10 flex">
        <AvatarProfile username="Victor" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost"> <FiEdit2 /> </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Editar perfil</SheetTitle>
              <SheetDescription>
                Se você alterar as informações presentes atualmente isso terá impacto na visualização
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </section>
      <Badge className="mt-3 mx-5 text-white bg-primary" variant="secondary">Vendedor</Badge>

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
            <AccordionContent>
              <p className="flex gap-1"><strong>Vendedor:</strong>Victor</p>
              <p className="flex gap-1"><strong>Condomínio:</strong>Vila serena ala Oeste</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </Fragment>
  )
}