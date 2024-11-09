"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronsUpDown, ScanSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import to from "await-to-js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Item } from "../interfaces/item";
import { cn } from "@/lib/utils";

import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { TooltipIconButton } from "@/components/custom/buttons/tooltip-icon-button";
import { Input } from "@/components/ui/input";

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "id",
    size: 100,
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    size: 300,
    header: () => <div>Name</div>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "supportCount",
    size: 100,
    header: ({ column }) => (
      <div className="flex items-center justify-end space-x-1">
        <span>Support Count</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (!column.getIsSorted()) {
              column.toggleSorting(false);
            } else if (column.getIsSorted() === "asc") {
              column.toggleSorting(true);
            } else {
              column.clearSorting();
            }
          }}
        >
          {column.getIsSorted() === "asc" ? (
            <ChevronUp />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      </div>
    ),

    cell: ({ row }) => (
      <div className="text-right">{row.original.supportCount}</div>
    ),
  },
  {
    id: "search",
    cell: ({ row }) => (
      <div className="text-right">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            const itemName = row.original.name;
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(itemName)}&tbm=isch`;
            window.open(googleSearchUrl, "_blank");
          }}
        >
          <ScanSearch />
        </Button>
      </div>
    ),
  },
];

export interface ItemsTableProps {
  items: Item[];
  isLoading: boolean;
}

export function ItemsTable({ items, isLoading }: ItemsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: items,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
  });

  return (
    <div className={cn("w-full")}>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
