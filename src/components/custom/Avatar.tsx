import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Context } from "@/state/zustandContext"
import Link from "next/link"
import { FiUser } from "react-icons/fi"

export function AvatarProfile() {
  const setIsLoading = Context.loadingStore((state) => state.setIsLoading)
  const user = JSON.parse(localStorage.getItem("user") as string)
  return (
    <section className="flex gap-2 items-center">
        <Avatar>
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
    </section>
    
  )
}
