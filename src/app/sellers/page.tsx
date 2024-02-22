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
import { IGetUsersQuery, IUserData } from "@/axios/types"
import { ViewControl } from "@/components/custom/ViewControl"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyData } from "@/components/custom/EmptyData"
import { useRouter } from "next/navigation"
import { updateUser } from "@/axios/requests/user/updateUser"
import toast from "react-hot-toast"

export default function Sellers() {
  const { user } = Context.userStore()
  const [users, setUsers] = useState<any>({})
  const { isLoading, setIsLoading } = Context.loadingStore()
  const [filters, setFilters] = useState<IGetUsersQuery>({
    search: "",
    role: 2,
    condo_id: user?.condo_id
  })
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    getUsers(filters)
      .then((response: any) => {
        setUsers(response?.data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [filters.role])

  if (!user || user.role !== 0) return router.push("/")

  function onActionInit(userId: string) {
    toast.promise(
      updateUser(userId, { role: filters.role === 1 ? 2 : 1 }),
      {
        loading: "Carregando...",
        success: () => {
          getUsers(filters)
            .then((response: any) => {
              setUsers(response?.data)
              setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
          return "Sucesso ao alterar"
        },
        error: (err) => err
      }
    )
  }

  function getVariantStyleByRole() {
    switch (Number(filters.role)) {
      case 1:
        return 'disaprove'
      case 2:
        return 'aprove'
    }
  }

  function getVariantBadgeByRole() {
    switch (Number(filters.role)) {
      case 1:
        return 'seller'
      case 2:
        return 'destructive'
    }
  }

  function getVariantNameByRole() {
    switch (Number(filters.role)) {
      case 1:
        return 'Desaprovar'
      case 2:
        return 'Aprovar'
    }
  }

  function getVariantStatusByRole() {
    switch (Number(filters.role)) {
      case 1:
        return 'Aprovado'
      case 2:
        return 'Pendente'
    }
  }

  function onSearchUser() {
    setIsLoading(true)
    getUsers(filters)
      .then((response: any) => {
        setUsers(response?.data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  function onHandleSearch(event: any) {
    setFilters((prevState) => {
      return {
        ...prevState,
        search: event.target.value
      }
    })
  }

  function onHandleUpdateRole(value: string) {
    setFilters((prevState) => {
      return {
        ...prevState,
        role: Number(value)
      }
    })
  }

  return (
    <Fragment>
      <HeaderMenu customClasses="flex">
        <section className="flex justify-between items-center w-full">
          <p className="font-raleway font-medium text-xl">Gerenciar vendedores</p>
          <section>
            <AvatarProfile />
          </section>
        </section>
      </HeaderMenu>

      <section className="flex items-center mt-8 flex-wrap gap-3">
        <section className=" flex w-full max-w-lg items-center space-x-2 border-r-[1px] border-gray-400 px-6">
          <Input value={filters.search} onChange={(event: any) => onHandleSearch(event)} type="text" className="border-gray-200" placeholder="Nome do usuário" />
          <Button onClick={onSearchUser} type="button" className=" flex gap-2">Buscar <FiSearch /></Button>
        </section>

        <section className="flex gap-2 overflow-x-auto md:overflow-hidden px-7 md:px-0 mt-3 md:mt-0">
          <SelectGroup.Select onValueChange={(value) => onHandleUpdateRole(value)} defaultValue="2">
            <SelectGroup.SelectTrigger className="w-[180px] bg-gray-900 text-white">
              <SelectGroup.SelectValue  placeholder="Status" />
            </SelectGroup.SelectTrigger>
            <SelectGroup.SelectContent>
              <SelectGroup.SelectGroup>
                <SelectGroup.SelectItem value="1">Aprovados</SelectGroup.SelectItem>
                <SelectGroup.SelectItem value="2">Pendentes</SelectGroup.SelectItem>
              </SelectGroup.SelectGroup>
            </SelectGroup.SelectContent>
          </SelectGroup.Select>
        </section>
      </section>

      <section className="w-full px-7 mt-5">
        <TableControlSellers
          collumns={users.total > 0 ? ['Status', 'E-mail', "Telefone", "Nome", "Ações"]: []}
        >
          <ViewControl
            isLoading={isLoading}
            totalRegisters={users.total}
            PageContent={
              users.data?.map((user: IUserData) => (
                <TableGroup.TableRow key={user.id}>
                  <TableGroup.TableCell className="font-medium">
                    <Badge variant={ getVariantBadgeByRole() }>{ getVariantStatusByRole() }</Badge>
                  </TableGroup.TableCell>
                  <TableGroup.TableCell>{user.email}</TableGroup.TableCell>
                  <TableGroup.TableCell className="truncate">{user.phone}</TableGroup.TableCell>
                  <TableGroup.TableCell >{user.name}</TableGroup.TableCell>
                  <TableGroup.TableCell>
                    <Button variant={ getVariantStyleByRole() } onClick={() => onActionInit(user.id)}>{ getVariantNameByRole() }</Button>
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
              <EmptyData customClass="h-80" customMessage="Nenhum usuário encontrado" />
            }
          />
        </TableControlSellers>
      </section>
    </Fragment>
  )
}