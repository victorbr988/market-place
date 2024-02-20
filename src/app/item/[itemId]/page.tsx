"use client"

import { HeaderMenu } from "@/components/custom/Header";
import { Fragment, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import * as SelectGroup from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { FiCopy, FiEdit2 } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast";
import { AvatarProfile } from "@/components/custom/Avatar";
import { IItem, ISeller } from "@/axios/types";
import { getItemsById } from "@/axios/requests/items/getItemById";
import { Context } from "@/state/zustandContext";
import { priceFormat } from "@/utils/priceFormat";
import { getUserById } from "@/axios/requests/user/getUserById";
import { dateFormat } from "@/utils/dateFormat";
import { ViewControl } from "@/components/custom/ViewControl";
import { CardItemSkeleton } from "@/components/custom/skeleton/CardItemSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { whatsappRedirect } from "@/utils/whatsappRedirect";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "@/components/custom/Progress";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { updateItem } from "@/axios/requests/items/updateItem";

interface IItemProps {
  params: { itemId: string }
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório"
  }),
  description: z.string().min(1, {
    message: "O nome é obrigatório"
  }).max(250, {
    message: "Máximo de 250 carácteres"
  }),
  type: z.coerce.string(),
  price: z.coerce.number().positive('O valor do item deve ser maior que 0')
})

export default function Item({ params }: IItemProps) {
  const [api, setApi] = useState<CarouselApi>()
  const { isLoading, setIsLoading } = Context.loadingStore()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [item, setItem] = useState<IItem>({} as IItem)
  const [seller, setSeller] = useState<ISeller>({} as ISeller)
  const uploadBaseRoute = process.env.NEXT_PUBLIC_UPLOAD_ORIGIN
  const user = JSON.parse(localStorage.getItem("user") as string)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      description: item.description,
      type: item.name,
      price: item.price,
    }
  })

  const description = form.watch("description")

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap() + 1)
   
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  function getItem(itemId: string) {
    getItemsById(itemId)
      .then((response: any) => {
        setItem(response?.data)
        setCount(response?.data.images.length)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  function getUser(id: string) {
    getUserById(id as string)
      .then((response: any) => {
        setSeller(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getItem(params.itemId)
  }, [])

  useEffect(() => {
    const id = item.seler_id
    if (id !== undefined) {
      getUser(item.seler_id)
    }
  }, [item])

  function copyToClipboard() {
    var temporaryElement = document.createElement('input'),
    text = window.location.href;

    document.body.appendChild(temporaryElement);
    temporaryElement.value = text;
    temporaryElement.select();
    document.execCommand('copy');
    document.body.removeChild(temporaryElement);

    toast.success("Link copiado para área de transferência")
  }

  function onContactSeller() {
    whatsappRedirect(seller.phone, `Gostaria de saber mais sobre o anúncio:`, window.location.href)
  }

  function onSaveEdit(itemInfo: z.infer<typeof formSchema>) {
    const itemFormat = {...itemInfo, category_id: item.category_id}
    setIsLoading(true)
    toast.promise(
      updateItem(item.id, itemFormat),
      {
        loading: "Salvando...",
        success: () => {
          getItem(params.itemId)
          setIsLoading(false)
          return "Dados alterados"
        },
        error: () => {
          setIsLoading(false)
          return "Algo deu errado"
        }
      }
    )
  }

  return(
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Página inicial</p>
          <section>
            <AvatarProfile />
          </section>
        </section>
      </HeaderMenu>

      <section className="md:pt-10 md:px-20">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-1 lg:flex lg:justify-center">
            <ViewControl 
              isLoading={isLoading}
              PageContent={
                (item?.images || []).map((imageName) => (
                <CarouselItem key={imageName} className="pl-1 md:basis-1/2 lg:basis-1/6">
                  <Card>
                    <CardContent>
                      <Dialog>
                        <DialogTrigger asChild>
                          <img className="w-full h-48 rounded-t-lg cursor-pointer" src={`${uploadBaseRoute}/${imageName}`} alt="Imagem de um item" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[1000px]">
                          <div>
                            <img className="w-full h-full rounded-t-lg" src={`${uploadBaseRoute}/${imageName}`} alt="Imagem de um item" />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
              Fallback={
                <CardItemSkeleton />
              }
            />
            
          </CarouselContent>
          <p className="font-raleway font-medium justify-center text-xl flex md:hidden">{current} - {count}</p>
        </Carousel>
      </section>

      <section className="flex justify-between gap-2 px-5 md:px-20 py-3">
        <p className="font-raleway font-semibold text-lg truncate w-2/3">{item.name}</p>
        <p className="font-sans font-semibold text-lg w-1/3 text-end">{priceFormat(item.price)}</p>
      </section>

      <section className="px-5 md:px-20">
        <Accordion defaultValue={["details", "information"]} type="multiple" className="w-full">
          <AccordionItem className="border-gray-400" defaultValue="1" value="details">
            <AccordionTrigger>Detalhes do anúncio</AccordionTrigger>
            <AccordionContent>
              { item.description }
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-gray-400" value="information">
            <AccordionTrigger>Informações adicionais</AccordionTrigger>
            <AccordionContent>
              <ViewControl 
                isLoading={isLoading}
                PageContent={
                  <section className="flex flex-col gap-4">
                    <p className="flex gap-1 font-sans"><strong>Vendedor:</strong>{ seller.name }</p>
                    <p className="flex gap-1 font-sans"><strong>Telefone:</strong>{ seller.phone }</p>
                    <p className="flex gap-1 font-sans"><strong>E-mail:</strong>{ seller.email }</p>
                    <p className="flex gap-1 font-sans"><strong>Vendedor desde:</strong>{ dateFormat(seller?.created_at || new Date().toISOString()) }</p>
                  </section>
                }
                Fallback={
                  <Fragment>
                    <Skeleton className="h4 w-24" />
                    <Skeleton className="h4 w-24" />
                    <Skeleton className="h4 w-24" />
                    <Skeleton className="h4 w-24" />
                  </Fragment>
                }
              />
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <section className="pt-3 flex gap-2 items-center">
          <Button variant="outline" onClick={() => copyToClipboard()}>
            <FiCopy />
          </Button>

          <p className="text-sm font-sans font-medium">Copiar link</p>
        </section>

        <section className={cn("pt-3 flex gap-2 items-center", [(!user || user.id !== seller.id) && 'hidden'])}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="hover:bg-transparent"> <FiEdit2 /> </Button>
            </SheetTrigger>
            <SheetContent side="mobileFull">
              <SheetHeader>
                <SheetTitle>Editar anúncio</SheetTitle>
                <SheetDescription>
                  Preencha todos os campos corretamente e verifique as informações antes de confirmar a edição
                </SheetDescription>
              </SheetHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSaveEdit)} className="py-4 flex flex-col gap-4">
                  <section>
                    <Label className="text-right">Nome</Label>
                    <Input defaultValue={item.name} autoComplete="username" className="col-span-3" placeholder="Seu Nome" type="text" {...form.register("name")} />
                    { form.formState.errors.name && (<span className="text-red-500 px-1 py-4 text-[12px]">{form.formState.errors.name?.message}</span>) }
                  </section>

                  <section>
                    <Label className="text-right">Descrição</Label>
                    <Textarea defaultValue={item.description} maxLength={250} placeholder="Descrição aqui..." {...form.register("description")} />
                    <ProgressBar className="mt-1" currentProgress={description?.length * 100 / 250 || item.description?.length * 100 / 250} maxProgress={250} />
                  </section>

                  <section>
                    <FormField
                      control={form.control}
                      name="type"
                      
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-right">Tipo do item</Label>
                          <SelectGroup.Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectGroup.SelectTrigger>
                                <SelectGroup.SelectValue placeholder="Selecione o tipo do item" />
                              </SelectGroup.SelectTrigger>
                            </FormControl>
                            <SelectGroup.SelectContent>
                              <SelectGroup.SelectGroup>
                                <SelectGroup.SelectItem value="1">Produto</SelectGroup.SelectItem>
                                <SelectGroup.SelectItem value="2">Serviço</SelectGroup.SelectItem>
                              </SelectGroup.SelectGroup>
                            </SelectGroup.SelectContent>
                          </SelectGroup.Select>
                          { form.formState.errors.type && (<span className="text-red-500 px-1 py-4 text-[12px]">{form.formState.errors.type?.message}</span>) }
                        </FormItem>
                      )}
                    />
                  </section>

                  <section>
                    <Label className="text-right">Preço</Label>
                    <Input defaultValue={item.price} className="col-span-3" type="number" {...form.register("price")} />
                    { form.formState.errors.price && (<span className="text-red-500 px-1 py-4 text-[12px]">{form.formState.errors.price?.message}</span>) }
                  </section>

                  <SheetFooter>
                    <SheetClose>
                      <Button type="submit">Salvar alterações</Button>
                    </SheetClose>
                  </SheetFooter>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
          <p className="text-sm font-sans font-medium">Editar anúncio</p>
        </section>
      </section>

      <section className="px-5 md:px-20 py-8 md:flex md:justify-center">
        <Button onClick={onContactSeller} type="button" className="w-full max-w-md py-6 font-sans text-md">Contatar vendedor</Button>
      </section>
    </Fragment>
  )
}