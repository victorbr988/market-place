"use client"

import { HeaderMenu } from "@/components/custom/Header"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Fragment, useEffect } from "react"
import { useForm } from "react-hook-form"
import { FiLock } from "react-icons/fi"
import { z } from "zod"
import { AvatarProfile } from "@/components/custom/Avatar"
import { Label } from "@/components/ui/label"
import { login } from "@/axios/requests/user/login"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { getUserLogged } from "@/axios/requests/user/getLogged"
import { getUserCredentialsGoogleAccount } from "@/firebase/Auth/google/userCredentials"

const formSchema = z.object({
  email: z.string().min(1, {
    message: "O e-mail é obrigatório"
  }).email('formato de e-mail inválido'),
  password: z.string().min(8, {
    message: "Sua senha precia ter ao menos 8 carácteres"
  })
})

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })


  const router = useRouter()

  useEffect(() => {
    if (window) {
      if (window.location.href.split("?").length > 1) {
        toast.error("Sessão expirada")
      }
    }
  }, [])

  function loginWithCredentials(userCredentials: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Salvando...")
    login(userCredentials)
      .then(() => {
        toast.dismiss(toastId)
        toast.success("Sessão iniciada")
        saveUserLoggedOnStorage()
        router.push("/")
      })
      .catch((error) => {
        toast.dismiss(toastId)
        toast.error("E-mail e/ou senha inválidos") 
      })
  }

  function saveUserLoggedOnStorage() {
    getUserLogged()
      .then((response: any) => {
      localStorage.setItem("user", JSON.stringify(response.data.user))
      router.push("/")
    }).catch((error) => console.log(error))
  }

  function onSigninWithGoogleAccount() {
    getUserCredentialsGoogleAccount()
      .then((response: any) => {
        loginWithCredentials({email: response.email, password: ""})
        router.push("/")
      })
      .catch((error) => console.log(error))
  }

  /*function onSigninWithFacebookAccount() {
    getUserCredentialsFacebookAccount()
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error))
  }*/

  return (
    <Fragment>
      <HeaderMenu>
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Login</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <section className="flex justify-center items-center h-[85vh] p-4">
        <section className="bg-white p-8 w-[500px] lg:w-[700px] rounded gap-4 flex flex-col shadow-lg mt-10">
          <form
            onSubmit={handleSubmit(loginWithCredentials)}
          >
            <section className="mb-3 flex flex-col gap-6">
              <section>
                <Label className="font-raleway font-medium text-lg">E-mail</Label>
                <Input autoComplete="username" className="font-sans" placeholder="Ex: meuemail@gmail.com" type="email" {...register("email")} />
                { errors.email && (<span className="text-red-500 p-1 text-sm">{errors.email?.message}</span>) }
              </section>

              <section>
                <Label className="font-raleway font-medium text-lg">Senha</Label>
                <Input autoComplete="current-password" className="font-sans" placeholder="********" type="password" {...register("password")} />
                { errors.password && (<span className="text-red-500 p-1 text-sm">{errors.password?.message}</span>) }
              </section>
            </section>

            <Button className="py-6 text-md w-full" type="submit">Acessar</Button>

            <div className="flex w-full gap-4 justify-center items-center py-3">
              <hr className="w-1/2 border-gray-400" />
              Ou
              <hr className="w-1/2 border-gray-400" />
            </div>

            <Button onClick={onSigninWithGoogleAccount} type="button" variant="outline" className="flex items-center w-full gap-2 py-6 text-md">
              <FcGoogle className="h-8 w-8" /> 
              Entrar com google
            </Button>

            <section className="flex gap-1 mt-8 justify-center">
            <p className="font-raleway font-medium">Ainda não possui conta?</p>
              <Link href="/create-account" className="underline text-gray-600">Cadastre-se</Link>
            </section>
          </form>
        </section>
        
      </section>
    </Fragment>
  )
}