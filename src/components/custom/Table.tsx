import { ReactNode } from "react";
import * as TableGroup from "@/components/ui/table"

interface ITableControlSellers {
  collumns: string[],
  children: ReactNode
}

export function TableControlSellers({ collumns, children }: ITableControlSellers) {
  return (
    <TableGroup.Table className="bg-white rounded-lg">
      <TableGroup.TableHeader>
        <TableGroup.TableRow>
          {collumns.map((collumn) => (
              <TableGroup.TableHead>{ collumn }</TableGroup.TableHead>
          ))}
        </TableGroup.TableRow>
      </TableGroup.TableHeader>
      <TableGroup.TableBody>
        { children }
      </TableGroup.TableBody>
    </TableGroup.Table>
  )
}