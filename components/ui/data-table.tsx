"use client"

import { useState } from "react"
import { useDebouncedCallback } from 'use-debounce'
import useSWR, { mutate } from 'swr'
import Cookies from "js-cookie"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LucideFilePlus2 } from "lucide-react"
import SkeletonTable from "@/components/ui/skeleton-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  apiUrl: string
  clickAdd: () => void
}

export function DataTable<TData, TValue>({
  columns,
  apiUrl,
  clickAdd
}: Readonly<DataTableProps<TData, TValue>>) {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [take, setTake] = useState<number>(10)
  const [search, setSearch] = useState<string>("")

  const router = useRouter()
  const pathname = usePathname()

  const token = Cookies.get('token')
  const fetchUrl = `${apiUrl}?search=${search}&page=${pageIndex}&take=${take}`

  const { data, isLoading } = useSWR(fetchUrl, url => fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(r => r.json()))

  const table = useReactTable({
    data: data?.data,
    columns,
    pageCount: data?.meta?.last_page ?? -1,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: 10
      }
    }
  });  
  
  const pageSizeOptions = [10, 20, 30, 40, 50, 100]

  const debounced = useDebouncedCallback(
    (value) => {
      setSearch(value)
      router.push(`${pathname}?search=${value}&page=${pageIndex}&take=${take}`, {scroll: false})
      mutate(fetchUrl)
    }, 1000
  )

  const handleAddButton = () => {
    clickAdd()
  }

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center justify-between py-4">
        <Input
          defaultValue={search}
          placeholder="Search"
          onChange={(e) => debounced(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2 justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={handleAddButton}>
              <LucideFilePlus2 className="w-8 h-8 text-sky-700" />
          </Button>
        </div>
      </div>
      {isLoading ? (
          <SkeletonTable />
      ) : 
      (
        <div className="w-full border rounded-md">
          <Table className="w-full">
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex flex-col items-center px-2 my-4 space-x-4 space-y-4 md:justify-between md:flex-row md:space-y-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
          <Select
            value={`${take}`}
            onValueChange={(value) => {
              setTake(Number(value));
              setPageIndex(1)
              router.push(`${pathname}?search=${search}&page=${1}&take=${Number(value)}`, {scroll: false})
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={take} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex} of{" "}
          {data?.meta?.last_page}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {setPageIndex(1); router.push(`${pathname}?search=${search}&page=${1}&take=${take}`, {scroll: false})}}
            disabled={!data?.links?.prev}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {setPageIndex(pageIndex - 1); router.push(`${pathname}?search=${search}&page=${pageIndex - 1}&take=${take}`, {scroll: false})}}
            disabled={!data?.links?.prev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {setPageIndex(pageIndex + 1); router.push(`${pathname}?search=${search}&page=${pageIndex + 1}&take=${take}`, {scroll: false})}}
            disabled={!data?.links?.next}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {setPageIndex(data?.meta?.last_page); router.push(`${pathname}?search=${search}&page=${data?.meta?.last_page}&take=${take}`, {scroll: false})}}
            disabled={!data?.links?.next}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
