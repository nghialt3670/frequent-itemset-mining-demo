import { NewExperimentDialog } from "@/features/experiments/components/new-experiment-dialog";
import { ExperimentTable } from "@/features/experiments/components/experiment-table";

export default function ExperimentsPage() {
  return (
    <main className="p-10">
      <div className="flex items-center py-4">
        <h1 className="text-xl font-bold">Experiments</h1>
        <NewExperimentDialog className="ml-auto" />
      </div>
      <ExperimentTable />
    </main>
  );
}
