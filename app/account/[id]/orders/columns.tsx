"use client"

import { Button } from "@/components/ui/button"
import { Checkbox} from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Actions } from "./actions"
import { Order } from "@/interfaces/order.interface"

export type User = {
  id: string
  name: string
  email: string
  role: string
  photo_url: string
  status: string
}
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns: ColumnDef<Order>[] = [

  {
    accessorKey: "date",
    header:  ({ column }) => {

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {
    accessorKey: "order_details",
    header: "Producto",
    cell: ({ row }) => {
      const productName = row.original.order_details?.[0]?.product?.product_name ?? "Unknown Product";
      return truncateText(productName, 20);
    }
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
