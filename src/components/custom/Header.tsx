import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {FiLogIn, FiLogOut, FiMenu} from "react-icons/fi"
import { Button } from "../ui/button"
import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Context } from "@/state/zustandContext"

interface IHeaderMenu {
  children: ReactNode;
  customClasses?: string | undefined;
}

export function HeaderMenu({ children, customClasses }: IHeaderMenu) {
  const setIsLoading = Context.loadingStore((state) => state.setIsLoading)

  return (
    <header className={cn("flex px-4 gap-2 items-center bg-white p-4 shadow-sm", [customClasses])}>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <FiMenu className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-5">

          <DropdownMenuLabel className="font-raleway">Navegar</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="font-sans">
              <Link className="w-full" href="/">Página inicial</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-sans">
              <Link className="w-full" href="/products">Produtos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-sans">
              <Link className="w-full" href="/services">Serviços</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />

          <DropdownMenuLabel className="font-raleway">Outras ações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className="font-sans">
              <Link className="w-full" href="/profile">Meu perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="w-full flex gap-2 justify-between h-8 text-red-800 font-sans" variant="outline">
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