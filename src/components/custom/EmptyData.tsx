import Image from "next/image"
import notFoundImage from "../../images/not-found.svg"
import { cn } from "@/lib/utils"

interface IEmptyData {
  customMessage: string,
  customClass?: string
}

export function EmptyData({ customMessage, customClass }: IEmptyData) {
  return (
    <section className={cn("flex flex-col gap-3 w-full justify-center items-center", [customClass ? customClass : 'h-[60vh]'])}>
      <Image priority width="200" src={notFoundImage} alt="Imagem de dados não encontrados" />
      <p className="text-lg font-sans font-medium">{ customMessage }</p>
    </section>
  )
}