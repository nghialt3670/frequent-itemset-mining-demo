import { Dataset } from "@/features/datasets/interfaces/dataset";

export type Algorithm = "apriori" | "fp-growth";
export type ExperimentStatus = "done" | "running" | "error";

export interface Itemsets {
  quantity: number;
  fileSource: string;
}

export interface Experiment {
  id: string;
  dataset: Dataset;
  algorithm: Algorithm;
  support: number;
  runTime?: number;
  itemsets?: Itemsets;
  status: ExperimentStatus;
  isLocal?: boolean;
}
