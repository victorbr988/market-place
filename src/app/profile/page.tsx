"use client"

import { AvatarProfile } from "@/components/custom/Avatar"
import { HeaderMenu } from "@/components/custom/Header"
import { Fragment, useEffect, useState } from "react"
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
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { FiBell, FiEdit2 } from "react-icons/fi"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getItemsByUserId } from "@/axios/requests/items/getItemsByUser"
import { ViewControl } from "@/components/custom/ViewControl"
import { Context } from "@/state/zustandContext"
import { CardItemSkeleton } from "@/components/custom/skeleton/CardItemSkeleton"
import { EmptyData } from "@/components/custom/EmptyData"
import { IItem } from "@/axios/types"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório"
  }),
  email: z.string().min(1, {
    message: "O e-mail é obrigatório"
  }).email('formato de e-mail inválido'),
  phone: z.string().min(11, {
    message: "Formato inválido"
  }).max(11, {
    message: "Formato inválido"
  })
})

export default function Profile() {
  const [numberNotifications, setNumberNotifications] = useState<number>(0)
  const { isLoading, setIsLoading } = Context.loadingStore()
  const [items, setItems] = useState([])
  const router = useRouter()
  const user = JSON.parse(localStorage.getItem("user") as string)
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.username,
      email: user.email,
      phone: user.phone
    }
  })

  useEffect(() => {
    if (!user) return router.push("/")
    getItemsByUserId(user.id)
      .then((response) => {
        setIsLoading(false)
        setItems(response?.data)
      })
      .catch(() => setIsLoading(false))
  }, [])

  function goToNotifications() {
    router.push("/sellers")
  }
  
  function onSaveEdit(userInfo: z.infer<typeof formSchema>) {
    console.log(userInfo)
  }

  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Meus perfil</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <section className="px-5 pt-10 flex">
        <AvatarProfile />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="hover:bg-transparent"> <FiEdit2 /> </Button>
          </SheetTrigger>
          <SheetContent side="mobileFull">
            <SheetHeader>
              <SheetTitle>Editar perfil</SheetTitle>
              <SheetDescription>
                Se você alterar as informações presentes atualmente, isso terá impacto na visualização
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit(onSaveEdit)} className="py-4 flex flex-col gap-4">
              <section>
                <Label className="text-right">Nome</Label>
                <Input autoComplete="username" className="col-span-3" placeholder="Seu Nome" type="text" {...register("name")} />
                { errors.name && (<span className="text-red-500 px-1 py-4 text-[12px]">{errors.name?.message}</span>) }
              </section>

              <section>
                <Label className="text-right">E-mail</Label>
                <Input autoComplete="username"className="col-span-3" placeholder="Ex: meuemail@gmail.com" type="email" {...register("email")} />
                { errors.email && (<span className="text-red-500 px-1 py-4 text-[12px]">{errors.email?.message}</span>) }
              </section>

              <section>
                <Label className="text-right">Telefone</Label>
                <Input autoComplete="username" className="col-span-3" placeholder="********" type="text" {...register("phone")} />
                { errors.phone && (<span className="text-red-500 px-1 py-4 text-[12px]">{errors.phone?.message}</span>) }
              </section>

              <SheetFooter>
                <Button type="submit">Salvar alterações</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
        <section className={cn("w-full relative flex justify-end items-center", [user.role !== 0 && 'hidden'])}>
          <FiBell onClick={() => goToNotifications()} className="h-5 w-5 mr-2 cursor-pointer" />
          
          <div className={cn("bg-red-900 absolute top-1 right-1 text-[9px] flex justify-center items-center text-white rounded-full", [
            numberNotifications > 0 ? 'h-4 w-4' : 'h-2 w-2'
          ])}>
            {numberNotifications > 0 ? numberNotifications : ''}
          
          </div>
        </section>
      </section>
      <Badge className="mt-3 mx-5 text-white bg-green-600 hover:bg-green-600" variant="secondary">
        { user.role === 0 ? 'Síndico': 'Vendedor'}
      </Badge>

      <section className="px-5 pt-8">
        
        <Accordion defaultValue={["adverts", "myData"]} type="multiple" className="w-full">
          <AccordionItem className={cn("border-gray-400", [user.role !== 1 && 'hidden'])} value="adverts">
            <AccordionTrigger>Anúncios</AccordionTrigger>
            <AccordionContent className="px-7">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1 gap-2">
                  <ViewControl
                    isLoading={isLoading}
                    totalRegisters={items.length}
                    EmptyComponent={
                      <EmptyData customClass="h-full" customMessage="Nenhum anúncio publicado" />
                    }
                    PageContent={
                      items.map((item: IItem) => (
                        <CardItem key={item.id} item={item} />
                      ))
                    }
                    Fallback={
                      <CardItemSkeleton />
                    }
                  />
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
                <section>
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input id="name" disabled value={user.username} className="col-span-3 bg-gray-500 text-white" />
                </section>
                <section>
                  <Label htmlFor="email" className="text-right">
                    E-mail
                  </Label>
                  <Input id="email" disabled value={user.email} className="col-span-3 bg-gray-500 text-white" />
                </section>
                <section>
                  <Label htmlFor="phone" className="text-right">
                    Telefone
                  </Label>
                  <Input id="phone" disabled value={user.phone} className="col-span-3 bg-gray-500 text-white" />
                </section>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </Fragment>
  )
}