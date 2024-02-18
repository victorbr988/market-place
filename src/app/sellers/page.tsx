"use client"
 
import { Fragment, useEffect, useState } from "react"
import * as SelectGroup from "@/components/ui/select"
import * as TableGroup from "@/components/ui/table"
import { HeaderMenu } from "@/components/custom/Header"
import { AvatarProfile } from "@/components/custom/Avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FiSearch } from "react-icons/fi"
import { TableControlSellers } from "@/components/custom/Table"
import { getUsers } from "@/axios/requests/user/getUsers"
import { Context } from "@/state/zustandContext"
import { IUserData } from "@/axios/types"
import { ViewControl } from "@/components/custom/ViewControl"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyData } from "@/components/custom/EmptyData"

export default function Sellers() {
  const [users, setUsers] = useState<any>({})
  const { isLoading, setIsLoading } = Context.loadingStore()
  const user = JSON.parse(localStorage.getItem("user") as string)

  useEffect(() => {
    setIsLoading(true)
    getUsers({ role: 2, condo_id: user.condo_id})
      .then((response: any) => {
        setUsers(response?.data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  function onApproveSeller(userId: string) {
    console.log(userId)
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

        <section className="flex gap-2 overflow-x-auto md:overflow-hidden px-7 md:px-0 mt-3 md:mt-0">
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
          collumns={['Status', 'E-mail', "Telefone", "Nome", "Ações"]}
        >
          <ViewControl
            isLoading={isLoading}
            totalRegisters={users.total}
            PageContent={
              users.data?.map((user: IUserData) => (
                <TableGroup.TableRow key={user.id}>
                  <TableGroup.TableCell className="font-medium">
                    <Badge variant="destructive">Pendente</Badge>
                  </TableGroup.TableCell>
                  <TableGroup.TableCell>{user.email}</TableGroup.TableCell>
                  <TableGroup.TableCell className="truncate">{user.phone}</TableGroup.TableCell>
                  <TableGroup.TableCell >{user.name}</TableGroup.TableCell>
                  <TableGroup.TableCell>
                    <Button onClick={() => onApproveSeller(user.id)} className="max-w-md bg-green-600 hover:bg-green-600/70 text-white text-start h-6">Aprovar</Button>
                  </TableGroup.TableCell>
                </TableGroup.TableRow>
              ))
            }
            Fallback={
              <TableGroup.TableRow>
                <TableGroup.TableCell>
                  <Skeleton className="h-5 w-28 bg-gray-600 rounded-lg" />
                </TableGroup.TableCell>
                <TableGroup.TableCell>
                  <Skeleton className="h-5 w-28 bg-gray-600 rounded-lg" />
                </TableGroup.TableCell>
                <TableGroup.TableCell>
                  <Skeleton className="h-5 w-28 bg-gray-600 rounded-lg" />
                </TableGroup.TableCell>
                <TableGroup.TableCell>
                  <Skeleton className="h-5 w-28 bg-gray-600 rounded-lg" />
                </TableGroup.TableCell>
                <TableGroup.TableCell>
                  <Skeleton className="h-5 w-28 bg-gray-600 rounded-lg" />
                </TableGroup.TableCell>
              </TableGroup.TableRow>
            }
            EmptyComponent={
              <EmptyData customMessage="Nenhum usuário pendente" />
            }
          />
        </TableControlSellers>
      </section>
    </Fragment>
  )
}