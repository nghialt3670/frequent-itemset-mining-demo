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
import { Download } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipIconButton } from "@/components/custom/buttons/tooltip-icon-button";
import { ExperimentPlaygroundDialog } from "./experiment-playground-dialog";
import { useExperiments } from "../hooks/use-experiments";
import { fetchAndCacheFile } from "@/utils/file.utils";
import { Experiment } from "../interfaces/experiment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import to from "await-to-js";
import { useToast } from "@/hooks/use-toast";
import { clear } from "idb-keyval";

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
          ? (row.getValue<number>("runTime") / 1000).toFixed(3)
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
    id: "action",
    cell: ({ row }) => {
      const { toast } = useToast()
      const experiment = row.original;

      const handleDownloadClick = async () => {
        const itemsetsFileSource = experiment.itemsets!.fileSource;
        const [error, itemsetsFile] = await to(fetchAndCacheFile(itemsetsFileSource));

        if (error) {
          toast({
            title: "Something went wrong!",
            description: "Failed to download itemsets file.",
          });
          return;
        }

        const link = document.createElement("a");

        link.href = URL.createObjectURL(itemsetsFile);
        link.download = `${experiment.dataset.name.toLowerCase()}-${itemsetsFile.name}`;
        link.click();

        URL.revokeObjectURL(link.href);
      };

      return (
        <div className="text-right">
          <TooltipIconButton
            text="Download itemsets file"
            onClick={handleDownloadClick}
            disabled={experiment.status !== "done"}
          >
            <Download />
          </TooltipIconButton>
          <ExperimentPlaygroundDialog
            experiment={experiment}
            disabled={experiment.status !== "done"}
          />
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
    const handleBeforeUnload = () => {
      clear();
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
