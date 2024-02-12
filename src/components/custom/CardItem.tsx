import { IItem } from "@/axios/types"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { priceFormat } from "@/utils/priceFormat"

interface ICardItem {
  item: IItem
}
export function CardItem({ item }: ICardItem) {
  const uploadBaseRoute = process.env.NEXT_PUBLIC_UPLOAD_ORIGIN

  return (
    <Card>
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
