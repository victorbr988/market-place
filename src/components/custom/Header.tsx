"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FiLogOut, FiMenu} from "react-icons/fi"
import { Button } from "../ui/button"
import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Context } from "@/state/zustandContext"
import { useRouter } from "next/navigation"
import { deleteSession } from "@/axios/requests/user/deleteSession"

interface IHeaderMenu {
  children: ReactNode;
  customClasses?: string | undefined;
}

export function HeaderMenu({ children, customClasses }: IHeaderMenu) {
  const setIsLoading = Context.loadingStore((state) => state.setIsLoading)
  const user = JSON.parse(localStorage.getItem("user") as string)
  const router = useRouter()

  function onDeleteSession() {
    deleteSession()
      .then(() => {
        localStorage.removeItem("user")
        router.push("/")
        window.location.reload()
      })
  }

  return (
    <header className={cn("flex gap-2 items-center bg-white py-2 md:px-3 px-2 shadow-sm", [customClasses])}>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <FiMenu className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-5 min-w-48">

          <DropdownMenuLabel className="font-raleway">Navegar</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="font-sans text-md">
              <Link onClick={() => setIsLoading(true)} className="w-full" href="/">Página inicial</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-sans  text-md">
              <Link onClick={() => setIsLoading(true)} className="w-full" href="/products">Produtos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-sans  text-md">
              <Link onClick={() => setIsLoading(true)} className="w-full" href="/services">Serviços</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />

          <DropdownMenuLabel className="font-raleway">Outras ações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className={cn("font-sans  text-md", [!user && 'hidden'])}>
              <Link onClick={() => setIsLoading(true)} className="w-full" href="/profile">Meu perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={cn("font-sans  text-md", [user && 'hidden'])}>
              <Link onClick={() => setIsLoading(true)} className="w-full" href="/login">Fazer login</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={
              cn(!user && 'hidden')
            }>
              <Button onClick={onDeleteSession} className="w-full flex gap-2 justify-between h-8 text-red-800 font-sans" variant="outline">
                Encerrar sessão
                <FiLogOut />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
        </DropdownMenuContent>
      </DropdownMenu>

      { children }
    </header>
    
  )
}