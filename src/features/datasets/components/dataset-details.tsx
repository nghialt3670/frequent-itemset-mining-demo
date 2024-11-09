"use client";

import { Download } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";
import { TooltipIconButton } from "@/components/custom/buttons/tooltip-icon-button";
import { useTransactions } from "../hooks/use-transactions";
import { Button } from "@/components/ui/button";
import { Dataset } from "../interfaces/dataset";
import { useItems } from "../hooks/use-items";
import { ItemsTable } from "./items-table";

export interface DatasetDetailsProps {
  dataset: Dataset;
}

export default function DatasetDetails(props: DatasetDetailsProps) {
  const { dataset } = props;
  const { loading, items } = useItems(dataset.items.fileSource);
  const { transactions } = useTransactions(dataset.transactions.fileSource);

  const countedItems = useMemo(() => {
    const itemCounts: Record<string, number> = {};

    transactions.forEach((transaction) =>
      transaction.itemIds.forEach(
        (itemId) => (itemCounts[itemId] = (itemCounts[itemId] ?? 0) + 1),
      ),
    );

    return items.map((item) => ({
      ...item,
      supportCount: itemCounts[item.id],
    }));
  }, [items, transactions]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="font-bold text-3xl">{dataset.name}</h2>
        <h3 className="italic">{dataset.description}</h3>
      </div>
      <div className="flex items-center py-4">
        <h1 className="text-xl font-bold">Items</h1>
        <Link href={dataset.items.fileSource}>
          <TooltipIconButton text="Download items file">
            <Download />
          </TooltipIconButton>
        </Link>
      </div>
      <ItemsTable items={countedItems} isLoading={loading} />
      <div className="flex items-center py-4">
        <h1 className="text-xl font-bold">Transactions</h1>
        <Link href={dataset.transactions.fileSource}>
          <Button variant="link">
            <Download />
          </Button>
        </Link>
      </div>
    </div>
  );
}
