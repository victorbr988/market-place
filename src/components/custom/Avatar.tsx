import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Context } from "@/state/zustandContext"
import Link from "next/link"
import { FiUser } from "react-icons/fi"

interface IAvatarProfile {
  username?: string
}

export function AvatarProfile({ username }: IAvatarProfile) {
  const setIsLoading = Context.loadingStore((state) => state.setIsLoading)
  return (
    <section className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback className="bg-gray-900 text-white">
            { username ? username[0] : <FiUser /> }
          </AvatarFallback>
        </Avatar>
        <p>
          { username 
            ? username 
            : <Link onClick={() => setIsLoading(true)} href="/login">Fazer login</Link>
          }
        </p>
    </section>
    
  )
}
