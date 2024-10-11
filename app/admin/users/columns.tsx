"use client"

import { Button } from "@/components/ui/button"
import { Checkbox} from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Actions } from "./actions"

export type User = {
  id: string
  name: string
  email: string
  role: string
  photo_url: string
  status: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header:  ({ column }) => {

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {
    accessorKey: "email",
    header:  ({ column }) => {

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {
    accessorKey: "role",
    header:  ({ column }) => {

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {
    accessorKey: "status",
    header:  ({ column }) => {

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {
    id: 'actions',
    cell: ({row}) => <Actions id={row.original.id}/>
  },
  
]
