import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ReactNode } from "react"
import { FiEdit } from "react-icons/fi"

interface ISheetButton {
  children: ReactNode
}

export function SheetButton({ children }: ISheetButton) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><FiEdit /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Atualizar informações</SheetTitle>
          <SheetDescription>
            Se você alterar as informações presentes atualmente isso terá impacto na visualização
          </SheetDescription>
        </SheetHeader>
        { children }
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
