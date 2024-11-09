import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import Link from "next/link";
import DatasetDetails from "@/features/datasets/components/dataset-details";
import { DATASETS } from "@/features/datasets/constants/datasets.constant";
import { DatasetList } from "@/features/datasets/components/dataset-list";
import { Button } from "@/components/ui/button";

export default function DatasetPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const dataset = DATASETS.find((dataset) => dataset.id === id);

  if (!dataset) {
    notFound();
  }

  return (
    <main className="p-10">
      <DatasetDetails dataset={dataset} />
    </main>
  );
}
