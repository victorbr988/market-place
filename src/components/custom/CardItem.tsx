import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export function CardItem() {
  return (
    <Card>
      <CardContent>
        <img className="w-full rounded-t-lg" src="https://acarnequeomundoprefere.com.br/uploads/media/image/frimesa-receita-hamburguer-suino_smlr.jpg" alt="Imagem de um item" />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-raleway font-[500] text-md w-[60%] truncate">Hamburguer</p>
        <p className="font-sans font-semibold text-sm text-end">R$ 455,99</p>
      </CardFooter>
    </Card>
  )
}
