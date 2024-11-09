import { DatasetList } from "@/features/datasets/components/dataset-list";

export default function DatasetsPage() {
  return (
    <main className="p-10">
      <div className="flex items-center py-4">
        <h1 className="text-xl font-bold">Datasets</h1>
        {/* <NewExperimentDialog className="ml-auto" /> */}
      </div>
      <DatasetList />
    </main>
  );
}
