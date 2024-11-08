"use client";

import { PropsWithChildren } from "react";
import { ExperimentsProvider } from "@/features/experiments/hooks/use-experiments";
import { Experiment } from "@/features/experiments/interfaces/experiment";
import { DatasetsProvider } from "@/features/datasets/hooks/use-datasets";
import { Dataset } from "@/features/datasets/interfaces/dataset";

export interface ProviderProps extends PropsWithChildren {
  datasets: Dataset[];
  experiments: Experiment[];
}

export function Provider(props: ProviderProps) {
  const { datasets, experiments, children } = props;

  return (
    <DatasetsProvider datasets={datasets}>
      <ExperimentsProvider experiments={experiments}>
        {children}
      </ExperimentsProvider>
    </DatasetsProvider>
  );
}
