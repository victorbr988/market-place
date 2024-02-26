"use client"

import { AvatarProfile } from "@/components/custom/Avatar";
import { HeaderMenu } from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import * as SelectGroup from "@/components/ui/select"
import { Context } from "@/state/zustandContext";
import { getCondos } from "@/axios/requests/condo/getCondos";
import { getUserCredentialsGoogleAccount } from "@/firebase/Auth/google/userCredentials";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { createUser } from "@/axios/requests/user/createUser";
import toast from "react-hot-toast";
import { IUser, IUserCreate, IUserData, IUserLogin } from "@/axios/types";
import { useRouter } from "next/navigation";
import { getUserCredentialsFacebookAccount } from "@/firebase/Auth/facebook/userCredentials";
import { FaFacebook } from "react-icons/fa";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProgressBar } from "@/components/custom/Progress";
import { Textarea } from "@/components/ui/textarea";
import { getStreetByCep } from "@/utils/getStreetByCep";
import { login } from "@/axios/requests/user/login";
import { getUserLogged } from "@/axios/requests/user/getLogged";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "O e-mail é obrigatório"
  }).email('formato de e-mail inválido'),
  password: z.string().min(8, {
    message: "Sua senha precia ter ao menos 8 carácteres"
  }),
  name: z.string().min(1, {
    message: "O nome é obrigatório"
  }),
  phone: z.string().min(1, {
    message: "O Telefone é obrigatório"
  }),
  condo_id: z.string().min(1, {
    message: "O condomínio é obrigatório"
  }),
})

const createCondoSchema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório"
  }),
  description: z.string().min(1, {
    message: "O nome é obrigatório"
  }),
  cep: z.coerce.number().min(1, {
    message: "O nome é obrigatório"
  }),
})

export default function CreateAccount() {
  const { setIsLoading } = Context.loadingStore()
  const { setUser } = Context.userStore()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [condos, setCondos] = useState([])
  const [modalInputPassword, setModalInputPassword] = useState<string>("")
  const [userCredentials, setUserCredentials] = useState<IUserData>({} as IUserData)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      condo_id: ""
    }
  })
  const condoField = form.watch("condo_id")

  const { register, handleSubmit, formState: { errors }, watch } = useForm<z.infer<typeof createCondoSchema>>({
    resolver: zodResolver(createCondoSchema),
    defaultValues: {
      name: "",
      description: "",
      cep: 0
    }
  })
  const description = watch("description")

  useEffect(() => {
    setIsLoading(true)
    getCondos()
      .then((response) => {
        setCondos(response.data.condominios)
        setIsLoading(false)
      })
      .catch((error: any) => {
        setIsLoading(false)
        console.log(error)
      })
  }, [])

  function loginWithCredentials(userCredentials: IUserLogin) {
    toast.promise(
      login(userCredentials),
      {
        loading: "Salvando...",
        success: () => {
          saveUserLoggedOnStorage()
  
          return "Sessão iniciada"
        },
        error: (err) => err
      }
    )
  }

  function saveUserLoggedOnStorage() {
    getUserLogged()
      .then((response: any) => {
      setUser(response.data.user as IUser)
    }).catch((error) => console.log(error))
  }

  function onCreateAccoutWithGoogle() {
    getUserCredentialsGoogleAccount()
      .then((response: any) => {
        setUserCredentials(response)
        setIsOpenModal(true)
      })
      .catch((error) => console.log(error))
  }

  function onCreateAccoutWithFacebook() {
    getUserCredentialsFacebookAccount()
      .then((response: any) => {
        setUserCredentials(response)
        setIsOpenModal(true)
      })
      .catch((error) => console.log(error))
  }

  function onCreateAccount(userData: z.infer<typeof formSchema>) {
    toast.promise(
      createUser(userData as IUserCreate),
      {
        loading: "Criando...",
        success: () => {
          setIsLoading(false)
          setModalInputPassword("")
          setIsOpenModal(false)
          form.resetField("condo_id", {
            defaultValue: ""
          })
          return "Usuário criado com sucesso"
        },
        error: (err) => err
      }
    )
  }

  function onConfirmPassword() {
    setIsLoading(true)
    const userData: IUserCreate = {
      ...userCredentials,
      phone: userCredentials.phone ?? "",
      password: modalInputPassword,
      condo_id: condoField
    }

    console.log(userData)

    toast.promise(
      createUser(userData),
      {
        loading: "Confirmando...",
        success: () => {
          setIsLoading(false)
          setModalInputPassword("")
          setIsOpenModal(false)
          loginWithCredentials({
            email: userData.email,
            password: userData.password
          })
          
          form.resetField("condo_id", {
            defaultValue: ""
          })
          return "Usuário criado com sucesso"
        },
        error: (err) => err
      }
    )
  }

  async function onCreateCondo(condoInfo: z.infer<typeof createCondoSchema>) {
    const streetInfo = await getStreetByCep(condoInfo.cep)

    console.log(streetInfo)
  }

  return (
    <Fragment>
       <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Criar conta</p>
          <section>
            <AvatarProfile />
          </section>
        </section>
      </HeaderMenu>

      <section className="flex justify-center items-center min-h-[85vh] p-4">
        <section className="bg-white p-8 w-[500px] lg:w-[700px] rounded gap-4 flex flex-col shadow-lg mt-10">
          <Form {...form}>
          <form
              onSubmit={form.handleSubmit(onCreateAccount)}
            >
              <section className="mb-3 flex flex-col gap-6">
                <section>
                  <Label className="font-raleway font-medium text-lg">Nome</Label>
                  <Input autoComplete="username" className="font-sans" placeholder="Ex: Jhon Doe" type="text" {...form.register("name")} />
                  {form.formState.errors.name && (<span className="text-red-500 p-1 text-sm">{ form.formState.errors.name?.message }</span>) }
                </section>

                <section>
                  <Label className="font-raleway font-medium text-lg">E-mail</Label>
                  <Input autoComplete="username" className="font-sans" placeholder="Ex: meuemail@gmail.com" type="email" {...form.register("email")} />
                  {form.formState.errors.email && (<span className="text-red-500 p-1 text-sm">{ form.formState.errors.email?.message }</span>) }
                </section>

                <section>
                  <Label className="font-raleway font-medium text-lg">Senha</Label>
                  <Input autoComplete="current-password" className="font-sans" placeholder="********" type="password" {...form.register("password")} />
                  { form.formState.errors.password && (<span className="text-red-500 p-1 text-sm">{form.formState.errors.password?.message}</span>) }
                </section>

                <section>
                  <Label className="font-raleway font-medium text-lg">Telefone</Label>
                  <Input autoComplete="username" className="font-sans" placeholder="Ex: 81965734245" type="text" {...form.register("phone")} />
                  {form.formState.errors.phone && (<span className="text-red-500 p-1 text-sm">{ form.formState.errors.phone?.message }</span>) }
                </section>
                <section>
                  <FormField
                      control={form.control}
                      name="condo_id"
                      render={({ field, formState }) => (
                        <FormItem>
                          <Label className="font-raleway font-medium text-lg">Condomínio</Label>
                          <SelectGroup.Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectGroup.SelectTrigger>
                                <SelectGroup.SelectValue placeholder="Selecione seu condomínio" />
                              </SelectGroup.SelectTrigger>
                            </FormControl>
                            <SelectGroup.SelectContent>
                              <SelectGroup.SelectGroup>
                                {
                                  condos.map((condo: any) => (
                                    <SelectGroup.SelectItem key={condo.id} value={condo.id}>{condo.name}</SelectGroup.SelectItem>
                                  ))
                                }
                              </SelectGroup.SelectGroup>
                            </SelectGroup.SelectContent>
                          </SelectGroup.Select>
                          {formState.errors.condo_id && (<span className="text-red-500 p-1 text-sm">{ formState.errors.condo_id?.message }</span>) }
                        </FormItem>
                      )}
                    />
                </section>
              </section>

              <Button className="w-full mt-4 h-12 text-md" type="submit">Cadastrar</Button>

              <div className="flex w-full gap-4 justify-center items-center py-3">
                <hr className="w-1/2 border-gray-400" />
                Ou
                <hr className="w-1/2 border-gray-400" />
              </div>
              {condoField.length === 0 && (<span className="text-red-500 p-1 text-sm w-full flex justify-center">Para usar as funcionalidades, preencha o condomínio primeiro</span>) }
              <Button disabled={condoField.length === 0} onClick={onCreateAccoutWithGoogle} type="button" variant="outline" className="flex items-center w-full gap-2 py-6 text-md"> <FcGoogle className="h-8 w-8" /> Cadastrar com google </Button>

              <Button  disabled={condoField.length === 0} onClick={onCreateAccoutWithFacebook} type="button" variant="outline" className="flex items-center bg-blue-600 hover:bg-blue-600/90 w-full gap-3 text-white hover:text-white py-6 text-md mt-3">
                <FaFacebook className="h-8 w-8 text-white" /> 
                Entrar com Facebook
              </Button>
              
            </form>
          </Form>
        </section>
      </section>

      <AlertDialog open={isOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Para continuar você deve criar uma senha</AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              <section>
                <Label className="font-raleway font-medium text-lg">Senha</Label>
                <Input value={modalInputPassword} onChange={(e) => setModalInputPassword(e.target.value)} autoComplete="current-password" className="font-sans" placeholder="********" type="password" />
                <span className="text-blue-500 py-3 text-md">A senha deve ter mais de 8 carácteres</span>
              </section>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpenModal(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmPassword} disabled={modalInputPassword.length < 8}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  )
}