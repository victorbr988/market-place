"use client"

import { AvatarProfile } from "@/components/custom/Avatar"
import { HeaderMenu } from "@/components/custom/Header"
import { Fragment, useEffect, useState } from "react"
import * as SelectGroup from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CardItem } from "@/components/custom/CardItem";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { FiBell, FiEdit2, FiPlus } from "react-icons/fi"
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
import { ICategories, IItem } from "@/axios/types"
import toast from "react-hot-toast"
import { updateUser } from "@/axios/requests/user/updateUser"
import { ProgressBar } from "@/components/custom/Progress"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { getCategories } from "@/axios/requests/categories/getCategories"
import { createItem } from "@/axios/requests/items/createItem"
import { getUsers } from "@/axios/requests/user/getUsers"

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
  }).optional() 
})

const formCreateItem = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório"
  }),
  description: z.string().min(1, {
    message: "A descrição é obrigatória"
  }).max(250, {
    message: "Máximo de 250 carácteres"
  }),
  type: z.coerce.string().min(1, {
    message: "Tipo de anúncio é obrigatório"
  }),
  price: z.coerce.number({
    invalid_type_error: 'Use apenas números com pontos ao invés de vírgulas para casas decimais'
  }).positive('O valor do item deve ser maior que 0'),
  category_id: z.string().min(1, {
    message: "Categoria é obrigatória"
  }),
  images: z.instanceof(FileList)
})

export default function Profile() {
  const [numberNotifications, setNumberNotifications] = useState<number>(0)
  const { isLoading, setIsLoading } = Context.loadingStore()
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState<ICategories[]>([])
  const router = useRouter()
  const user = JSON.parse(localStorage.getItem("user") as string)

  if (!user) return router.push("/")

  useEffect(() => {
    setIsLoading(true)
    getItemsByUserId(user.id)
      .then((response) => {
        setItems(response?.data)
      })
      .catch(() => setIsLoading(false))
    getCategories()
      .then((response) => {
        setCategories(response.categories)
      })
      .catch(() => setIsLoading(false))
    getUsers({ role: 2, condo_id: user.condo_id})
      .then((response) => {
        setNumberNotifications(response?.data.total)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.username,
      email: user.email,
      phone: user.phone
    }
  })

  const form = useForm<z.infer<typeof formCreateItem>>({
    resolver: zodResolver(formCreateItem),
    defaultValues: {
      price: 0,
      category_id: '',
      type: '',
      description: '',
    }
  })

  const description = form.watch("description")

  function goToNotifications() {
    setIsLoading(true)
    router.push("/sellers")
  }
  
  function onSaveEdit(userInfo: z.infer<typeof formSchema>) {
    setIsLoading(true)
    toast.promise(
      updateUser(user.id, userInfo),
      {
        loading: "Salvando...",
        success: () => {
          setIsLoading(false)
          router.push("/login")
          return "Informações alteradas"
        },
        error: () => {
          setIsLoading(false)
          return "Algo deu errado"
        }
      }
    )
  }

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    if (files.length > 4) {
      form.setError("images", {
        type: "maxLength",
        message: "Máximo de 4 arquivos por anúncio"
      });
    } else {
      form.clearErrors("images");
    }
  };

  function onCreateItem(itemInfo: z.infer<typeof formCreateItem>) {
    const formData = new FormData();
    formData.append('name', itemInfo.name);
    formData.append('description', itemInfo.description);
    formData.append('type', itemInfo.type);
    formData.append('price', itemInfo.price.toString());
    formData.append('category_id', itemInfo.category_id);

    Array.from(itemInfo.images).forEach((file) => {
      formData.append('file', file)
    })

    setIsLoading(true)
    toast.promise(
      createItem(formData),
      {
        loading: "Salvando...",
        success: () => {
          getItemsByUserId(user.id)
            .then((response) => {
              setItems(response?.data)
            })
            .catch(() => setIsLoading(false))
          getCategories()
            .then((response) => {
              setCategories(response.categories)
              setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
          return "Dados alterados"
        },
        error: () => {
          setIsLoading(false)
          return "Algo deu errado"
        }
      }
    )

    form.resetField('name')
    form.resetField('description')
    form.resetField('type', {
      defaultValue: ''
    })
    form.resetField('price');
    form.resetField('category_id', {
      defaultValue: ''
    })
    form.resetField('images')
  }

  function getVariantStyleByUserRole() {
    switch (user.role) {
      case 0:
        return 'liquidator'
      case 1:
        return 'seller'
      default:
        return 'destructive'
    }
  }

  function getVariantStatusByRole() {
    switch (user.role) {
      case 0:
        return 'Síndico'
      case 1:
        return 'Vendedor'
      default:
        return 'Aguardando aprovação'
    }
  }

  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Meu perfil</p>
          <section>
            <AvatarProfile />
          </section>
        </section>
      </HeaderMenu>

      <section className="px-5 pt-10 flex w-full">
        <AvatarProfile>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="hover:bg-transparent"> <FiEdit2 /> </Button>
            </SheetTrigger>
            <SheetContent side="mobileFull">
              <SheetHeader>
                <SheetTitle>Editar perfil</SheetTitle>
                <SheetDescription>
                  Para atualizar suas informações, você será redirecionado para que possa iniciar uma nova sessão
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
        </AvatarProfile>
        <section className={cn("w-full relative flex justify-end items-center", [(!user || user.role !== 0) && 'hidden'])}>
          <FiBell id="notification" onClick={() => goToNotifications()} className="h-5 w-5 mr-2 cursor-pointer" />
          
          <div onClick={() => goToNotifications()} className={cn("bg-red-900 cursor-pointer absolute top-1 right-1 text-[9px] flex justify-center items-center text-white rounded-full", [
            numberNotifications > 0 ? 'h-4 w-4' : 'h-2 w-2'
          ])}>
            {numberNotifications > 0 ? numberNotifications : ''}
          
          </div>
        </section>
        <section className={cn("w-full relative flex justify-end items-center", [(!user || user.role !== 1) && 'hidden'])}>
        
        </section>
      </section>
      <section className="flex w-full justify-between items-center px-5 mt-3">
      <Badge 
        className="text-white" 
        variant={getVariantStyleByUserRole()}>
        { getVariantStatusByRole() }
      </Badge>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex gap-2">
              <FiPlus />
              Criar um anúncio
            </Button>
          </SheetTrigger>
          <SheetContent side="mobileFull">
            <SheetHeader>
              <SheetTitle>Editar anúncio</SheetTitle>
              <SheetDescription>
                Verifique todas as informações preenchidas antes de confirmar a criação do anúncio
              </SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onCreateItem)} className="py-4 flex flex-col gap-4">
                <section>
                  <Label className="text-right">Nome</Label>
                  <Input autoComplete="username" className="col-span-3" placeholder="Nome do produto" type="text" {...form.register("name")} />
                  { form.formState.errors.name && (<span className="text-red-500 px-1 py-4 text-[12px]">{form.formState.errors.name?.message}</span>) }
                </section>

                <section>
                  <Label className="text-right">Descrição</Label>
                  <Textarea maxLength={250} placeholder="Descrição aqui..." {...form.register("description")} />
                  <ProgressBar className="mt-1" currentProgress={description?.length * 100 / 250 || 0 } maxProgress={250} />
                  { form.formState.errors.description && (<span className="text-red-500 px-1 py-4 text-[12px]">{form.formState.errors.description?.message}</span>) }
                </section>

                <section>
                  <FormField
                    control={form.control}
                    name="type"
                    
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-right">Tipo do anúncio</Label>
                        <SelectGroup.Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectGroup.SelectTrigger>
                              <SelectGroup.SelectValue placeholder="Selecione o tipo do anúncio" />
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
                  <FormField
                    control={form.control}
                    name="category_id"
                    
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-right">Categoria do anúncio</Label>
                        <SelectGroup.Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectGroup.SelectTrigger>
                              <SelectGroup.SelectValue placeholder="Seleciona uma categoria" />
                            </SelectGroup.SelectTrigger>
                          </FormControl>
                          <SelectGroup.SelectContent>
                            <SelectGroup.SelectGroup>
                              {
                                categories.map((category) => (
                                  <SelectGroup.SelectItem key={category.id} value={category.id}>{category.name}</SelectGroup.SelectItem>
                                ))
                              }
                            </SelectGroup.SelectGroup>
                          </SelectGroup.SelectContent>
                        </SelectGroup.Select>
                        { form.formState.errors.category_id && (<span className="text-red-500 px-1 py-4 text-[12px]">{form.formState.errors.category_id?.message}</span>) }
                      </FormItem>
                    )}
                  />
                </section>

                <section>
                  <Label className="text-right">Preço</Label>
                  <Input className="col-span-3" type="text" {...form.register("price")} />
                  { form.formState.errors.price && (<span className="text-red-500 px-1 py-4 text-[12px]">{form.formState.errors.price?.message}</span>) }
                </section>

                <section>
                  <Label className="text-right">Imagens</Label>
                  <Input className="col-span-3" type="file" multiple { ...form.register("images") } onChange={(event) => handleFileChange(event)} />
                  { form.formState.errors.images && (<span className="text-red-500 px-1 py-4 text-[12px]">{form.formState.errors.images?.message}</span>) }
                </section>

                <SheetFooter>
                  <Button className="w-full sm:max-w-lg" type="submit">Salvar</Button>
                </SheetFooter>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </section>
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
                        <CardItem clasName="min-w-56" key={item.id} item={item} />
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