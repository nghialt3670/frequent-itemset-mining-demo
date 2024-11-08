"use client";

import { ComponentProps } from "react";
import { useDatasets } from "../hooks/use-datasets";
import { DatasetCard } from "./dataset-card";
import { cn } from "@/lib/utils";

export interface DatasetListProps extends ComponentProps<"div"> {}

export function DatasetList(props: DatasetListProps) {
  const { className } = props;
  const { datasets } = useDatasets();

  return (
    <div className={cn("flex flex-col space-y-4 p-4", className)}>
      {datasets.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
    </div>
  );
}
