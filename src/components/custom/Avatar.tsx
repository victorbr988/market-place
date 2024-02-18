import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Context } from "@/state/zustandContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { FiUser } from "react-icons/fi"

interface IAvatarProfile {
  children?: ReactNode
}
export function AvatarProfile({ children }: IAvatarProfile) {
  const setIsLoading = Context.loadingStore((state) => state.setIsLoading)
  const user = JSON.parse(localStorage.getItem("user") as string)
  const router = useRouter()
  return (
    <section className="flex items-center w-full gap-2">
        <Avatar 
          className="cursor-pointer" onClick={() => user && router.push('/profile')}
        >
          <AvatarFallback className="bg-gray-900 text-white">
            { user ? user.username[0].toLocaleUpperCase() : <FiUser /> }
          </AvatarFallback>
        </Avatar>
        <p>
          { user 
            ? user.username 
            : <Link onClick={() => setIsLoading(true)} href="/login">Fazer login</Link>
          }
        </p>
        { children }
    </section>
    
  )
}
