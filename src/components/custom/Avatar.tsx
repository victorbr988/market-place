import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Context } from "@/state/zustandContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { FiUser } from "react-icons/fi"

interface IAvatarProfile {
  children?: ReactNode
}
export function AvatarProfile({ children }: IAvatarProfile) {
  const setIsLoading = Context.loadingStore((state) => state.setIsLoading)
  const user = Context.userStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    Context.userStore.persist.rehydrate()
  }, [])

  const hasUser = user.username.length > 0

  return (
    <section className="flex items-center w-full gap-2">
        <Avatar 
          className="cursor-pointer" onClick={() => hasUser && router.push('/profile')}
        >
          <AvatarFallback className="bg-gray-900 text-white">
            { hasUser ? user.username[0].toLocaleUpperCase() : <FiUser /> }
          </AvatarFallback>
        </Avatar>
        <p>
          { hasUser  
            ? user.username 
            : <Link onClick={() => setIsLoading(true)} href="/login">Fazer login</Link>
          }
        </p>
        { children }
    </section>
    
  )
}
