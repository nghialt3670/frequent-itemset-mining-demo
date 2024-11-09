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
import { useEffect, useRef, useState } from "react";
import { FlaskConical } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TooltipIconButton from "@/components/custom/buttons/tooltip-icon-button";
import { useExperiments } from "../hooks/use-experiments";
import { Experiment } from "../interfaces/experiment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ALGORITHM_MAPPINGS: Record<string, string> = {
  apriori: "Apriori",
  "fp-growth": "FP-Growth",
};

export const columns: ColumnDef<Experiment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    id: "dataset.name",
    accessorKey: "dataset.name",
    header: () => <div className="text-right">Dataset</div>,
    cell: ({ row }) => (
      <Link className="flex" href={`/datasets/${row.original.dataset.id}`}>
        <Button className="ml-auto px-0" variant="link">
          {row.original.dataset.name}
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "algorithm",
    header: () => <div className="text-right">Algorithm</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {ALGORITHM_MAPPINGS[row.getValue("algorithm") as string]}
      </div>
    ),
  },
  {
    accessorKey: "support",
    header: () => <div className="text-right">Support</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.getValue<number>("support").toFixed(3)}
      </div>
    ),
  },
  {
    accessorKey: "runTime",
    header: () => <div className="text-right">Run time (s)</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.getValue<number>("runTime")
          ? row.getValue<number>("runTime").toFixed(3)
          : "---"}
      </div>
    ),
  },
  {
    accessorKey: "itemsets.quantity",
    header: () => <div className="text-right">#Itemsets</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.itemsets?.quantity ?? "---"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("status")}</div>
    ),
  },
  {
    id: "playground",
    cell: ({ row }) => {
      const experiment = row.original;

      return (
        <div className="text-right">
          {row.original.status === "done" ? (
            <Link href={`/experiments/${experiment.id}`}>
              <TooltipIconButton text="Playground">
                <FlaskConical />
              </TooltipIconButton>
            </Link>
          ) : (
            <TooltipIconButton text="Playground" disabled>
              <FlaskConical />
            </TooltipIconButton>
          )}
        </div>
      );
    },
  },
];

export function ExperimentTable() {
  const { experiments } = useExperiments();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const numPrevExperimentsRef = useRef<number>(0);

  const table = useReactTable({
    data: experiments,
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

  useEffect(() => {
    if (experiments.length === numPrevExperimentsRef.current + 1) {
      table.setPageIndex(
        Math.floor(experiments.length / (pagination.pageSize + 0.1)),
      );
    }
    numPrevExperimentsRef.current = experiments.length;
  }, [experiments, table, pagination.pageSize]);

  return (
    <div className={cn("w-full")}>
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
            {table.getRowModel().rows?.length ? (
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
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
