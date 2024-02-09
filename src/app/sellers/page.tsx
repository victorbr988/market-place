"use client"
 
import { Fragment } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { HeaderMenu } from "@/components/custom/Header"
import { AvatarProfile } from "@/components/custom/Avatar"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FiSearch } from "react-icons/fi"

export default function Sellers() {
  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Vendedores</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <section className="flex items-center mt-8 flex-wrap gap-3">
        <section className=" flex w-full max-w-lg items-center space-x-2 border-r-[1px] border-gray-400 px-6">
          <Input type="text" className="border-gray-200" placeholder="Nome do vendedor" />
          <Button type="button" className=" flex gap-2">Buscar <FiSearch /></Button>
        </section>

        <section className="flex gap-2 overflow-x-auto md:overflow-hidden px-3 md:px-0 mt-3 md:mt-0">
          <Select defaultValue="pendentes">
            <SelectTrigger className="w-[180px] bg-gray-900 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="aprovados">Aprovados</SelectItem>
                <SelectItem value="pendentes">Pendentes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
      </section>

      <div className="w-full px-7 mt-5">
        <Table className="bg-white rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Condomínio</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <Badge variant="destructive">Pendente</Badge>
              </TableCell>
              <TableCell>fulano@gmail.com</TableCell>
              <TableCell className="truncate">Vila Serena Ala oeste</TableCell>
              <TableCell>Victor</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Aprovar</DropdownMenuItem>
                    <DropdownMenuItem>Recusar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Fragment>
  )
}