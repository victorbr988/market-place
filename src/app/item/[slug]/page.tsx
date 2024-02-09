"use client"

import { HeaderMenu } from "@/components/custom/Header";
import { Fragment, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { FiCopy } from "react-icons/fi";
import { SheetButton } from "@/components/custom/Sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast";
import { AvatarProfile } from "@/components/custom/Avatar";

export default function Item() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(4)

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  function copyToClipboard(event: any) {
    var temporaryElement = document.createElement('input'),
    text = window.location.href;

    document.body.appendChild(temporaryElement);
    temporaryElement.value = text;
    temporaryElement.select();
    document.execCommand('copy');
    document.body.removeChild(temporaryElement);

    toast.success("Link copiado para área de transferência")
  }

  return(
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Página inicial</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <section className="md:pt-10 md:px-20">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-1 lg:flex lg:justify-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/6">
                <Card>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <img className="w-full h-full rounded-t-lg" src="https://acarnequeomundoprefere.com.br/uploads/media/image/frimesa-receita-hamburguer-suino_smlr.jpg" alt="Imagem de um item" />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <div className="p-2">
                          <img className="w-full h-full rounded-t-lg" src="https://acarnequeomundoprefere.com.br/uploads/media/image/frimesa-receita-hamburguer-suino_smlr.jpg" alt="Imagem de um item" />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <p className="font-raleway font-medium justify-center text-xl flex md:hidden">{current} - {count}</p>
        </Carousel>
      </section>

      <section className="flex justify-between gap-2 px-5 md:px-20 py-3">
        <p className="font-raleway font-semibold text-lg truncate w-2/3">Hamburguer</p>
        <p className="font-sans font-semibold text-lg w-1/3 text-end">R$ 455,99</p>
      </section>

      <section className="px-5 md:px-20">
        <Accordion defaultValue={["details", "information"]} type="multiple" className="w-full">
          <AccordionItem className="border-gray-400" defaultValue="1" value="details">
            <AccordionTrigger>Detalhes do item</AccordionTrigger>
            <AccordionContent>
              Um suculento hambúrguer grelhado de carne angus, coberto com queijo cheddar derretido, alface iceberg crocante, fatias de tomate maduro, cebola caramelizada e um toque de molho especial, tudo envolto em um pão brioche levemente tostado.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-gray-400" value="information">
            <AccordionTrigger>Informações adicionais</AccordionTrigger>
            <AccordionContent>
              <p className="flex gap-1"><strong>Vendedor:</strong>Victor</p>
              <p className="flex gap-1"><strong>Condomínio:</strong>Vila serena ala Oeste</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <section className="pt-3 flex gap-2 items-center">
          <Button variant="outline" onClick={(event) => copyToClipboard(event)}>
            <FiCopy />
          </Button>

          <p className="text-sm font-sans font-medium">Copiar link</p>
        </section>

        <section className="pt-3 flex gap-2 items-center">
          <SheetButton>
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
          </SheetButton>
          <p className="text-sm font-sans font-medium">Editar item</p>
        </section>
      </section>

      <section className="px-5 md:px-20 py-8 md:flex md:justify-center">
        <Button type="button" className="w-full max-w-md py-6 font-sans text-md">Contatar vendedor</Button>
      </section>
    </Fragment>
  )
}