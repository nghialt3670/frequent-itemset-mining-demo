import { DatasetList } from "@/features/datasets/components/dataset-list";
import { DatasetsContext } from "@/features/datasets/hooks/use-datasets";

export default async function Home() {
  return (
    <main>
      <DatasetList />
    </main>
  );
}
