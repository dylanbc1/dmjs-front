'use client'

import * as React from "react"

import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  Row
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterKey: string
//   onDelete: (rows: Row<TData>[]) => void
  disabled?: boolean
}

interface Meta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }
  
export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  //onDelete,
  disabled
}: DataTableProps<TData, TValue>) {

    
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
        sorting,
        columnFilters,
        rowSelection
    }
  })

  return (
    <div>
        <div className="flex items-center py-4 ">
            <Input
            placeholder={`Filtrar por fecha`}
            value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn(filterKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button 
                    disabled={disabled}
                    size='sm'
                    variant='outline'
                    className='ml-auto font-normal text-xs'>
                    <Trash className='h-4 w-4 mr-2' />
                    Eliminar ({table.getFilteredSelectedRowModel().rows.length})
                </Button>
            )}
        </div>
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    className={(row.original as any).status === 'INACTIVE' ? 'bg-red-100' : ''}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No hay resultados.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} de{" "}
                {table.getFilteredRowModel().rows.length} columna(s) seleccioada.
            </div>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            Antes
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            Siguiente
            </Button>
      </div>
    </div>
  )
}
