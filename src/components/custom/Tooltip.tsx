import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import { FiInfo } from "react-icons/fi"

interface ITooltpInfo {
  className: string;
}

export function TooltipInfo({ className }: ITooltpInfo) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger className={className} asChild
        >
          <Button
            onClick={() => setIsOpen(!isOpen)} 
            variant="ghost" className="hover:bg-transparent"
            >
              <FiInfo />
            </Button>
        </TooltipTrigger>
        <TooltipContent className="w-56">
          <p>Seu perfil está em análise, portanto não poderá anunciar até que seja aprovado pelo síndico do seu condomínio</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
