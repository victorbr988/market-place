import { IItem } from "@/axios/types"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Context } from "@/state/zustandContext"
import { priceFormat } from "@/utils/priceFormat"
import { useRouter } from "next/navigation"

interface ICardItem {
  item: IItem
}
export function CardItem({ item }: ICardItem) {
  const { setIsLoading } = Context.loadingStore()
  const uploadBaseRoute = process.env.NEXT_PUBLIC_UPLOAD_ORIGIN
  const router = useRouter()

  function goToItemInformation() {
    setIsLoading(true)
    router.push(`/item/${item.id}`)
  }

  return (
    <Card 
      className="hover:scale-105 transition-all cursor-pointer"
      onClick={goToItemInformation}
    >
      <CardContent>
        <img className="w-full h-24 rounded-t-lg" src={`${uploadBaseRoute}/${item.images[0]}`} alt="Imagem de um item" />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-raleway font-[500] text-lg md:text-md w-[60%] truncate">{ item.name }</p>
        <p className="font-sans font-semibold text-lg md:text-sm text-end">{ priceFormat(item.price) }</p>
      </CardFooter>
    </Card>
  )
}
