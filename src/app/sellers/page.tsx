"use client"
 
import { Fragment, useState } from "react"
import * as SelectGroup from "@/components/ui/select"
import * as TableGroup from "@/components/ui/table"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { HeaderMenu } from "@/components/custom/Header"
import { AvatarProfile } from "@/components/custom/Avatar"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FiSearch } from "react-icons/fi"
import { AlertDialogConfirm } from "@/components/custom/AlertDialog"
import { TableControlSellers } from "@/components/custom/Table"

export default function Sellers() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function onClose() {
    setModalOpen(false)
  }

  function onOpen() {
    setModalOpen(true)
  }

  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Gerenciar vendedores</p>
          <AvatarProfile />
        </section>
      </HeaderMenu>

      <section className="flex items-center mt-8 flex-wrap gap-3">
        <section className=" flex w-full max-w-lg items-center space-x-2 border-r-[1px] border-gray-400 px-6">
          <Input type="text" className="border-gray-200" placeholder="Nome do vendedor" />
          <Button type="button" className=" flex gap-2">Buscar <FiSearch /></Button>
        </section>

        <section className="flex gap-2 overflow-x-auto md:overflow-hidden px-3 md:px-0 mt-3 md:mt-0">
          <SelectGroup.Select defaultValue="pendentes">
            <SelectGroup.SelectTrigger className="w-[180px] bg-gray-900 text-white">
              <SelectGroup.SelectValue placeholder="Status" />
            </SelectGroup.SelectTrigger>
            <SelectGroup.SelectContent>
              <SelectGroup.SelectGroup>
                <SelectGroup.SelectItem value="aprovados">Aprovados</SelectGroup.SelectItem>
                <SelectGroup.SelectItem value="pendentes">Pendentes</SelectGroup.SelectItem>
              </SelectGroup.SelectGroup>
            </SelectGroup.SelectContent>
          </SelectGroup.Select>
        </section>
      </section>

      <section className="w-full px-7 mt-5">
        <TableControlSellers
          collumns={['Status', 'E-mail', "Condomínio", "Nome", "Ações"]}
        >
          <TableGroup.TableRow>
              <TableGroup.TableCell className="font-medium">
                <Badge variant="destructive">Pendente</Badge>
              </TableGroup.TableCell>
              <TableGroup.TableCell>fulano@gmail.com</TableGroup.TableCell>
              <TableGroup.TableCell className="truncate">Vila Serena Ala oeste</TableGroup.TableCell>
              <TableGroup.TableCell>Victor</TableGroup.TableCell>
              <TableGroup.TableCell>
                <DropdownMenu open={modalOpen}>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" onClick={onOpen} className="h-8 w-8 p-0 hover:bg-gray-200">
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <AlertDialogConfirm
                        title="Você tem certeza?"
                        message="Ao aprovar o usuário, você permitirá que ele possa ofertar produtos e/ou serviços para seu condomínio"
                        cancelAction={onClose}
                        continueAction={onClose}>
                        <Button variant="ghost" className="w-full text-start h-6">Aprovar</Button>
                      </AlertDialogConfirm>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AlertDialogConfirm
                        title="Você tem certeza?"
                        message="Ao recusar o usuário, você não permitirá que ele possa ofertar produtos e/ou serviços para seu condomínio"
                        cancelAction={onClose} 
                        continueAction={onClose}>
                        <Button variant="ghost" className="w-full text-start h-6">Recusar</Button>
                      </AlertDialogConfirm>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button onClick={onClose} variant="destructive" className="w-full text-start h-6">Cancelar</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableGroup.TableCell>
            </TableGroup.TableRow>
        </TableControlSellers>
      </section>
    </Fragment>
  )
}