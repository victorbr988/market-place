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
      <CardFooter className="flex justify-between gap-2">
        <p className="font-raleway font-[500] text-lg truncate w-2/3">Hamburguer</p>
        <p className="font-sans font-semibold text-lg w-1/3 text-end">R$ 455,99</p>
      </CardFooter>
    </Card>
  )
}
