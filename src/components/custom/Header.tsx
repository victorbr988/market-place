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


export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <FiMenu className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-5">

        <DropdownMenuLabel className="font-raleway">Navegar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="font-sans text-md">
            <Link className="w-full" href="/">Página inicial</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-sans text-md">
            <Link className="w-full" href="/products">Produtos</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-sans text-md">
            <Link className="w-full" href="/services">Serviços</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="font-raleway">Outras ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/login" className="inline-flex p-2 gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
              Acessar minha conta
              <FiLogIn />
            </Link> 
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Button disabled className="w-full flex justify-between h-8 text-red-800 font-sans" variant="outline">
              Encerrar sessão
              <FiLogOut />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}