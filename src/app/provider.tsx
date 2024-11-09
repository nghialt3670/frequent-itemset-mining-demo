"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";
import { PropsWithChildren } from "react";
import { ExperimentsProvider } from "@/features/experiments/hooks/use-experiments";
import { Experiment } from "@/features/experiments/interfaces/experiment";
import { DatasetsProvider } from "@/features/datasets/hooks/use-datasets";
import { Dataset } from "@/features/datasets/interfaces/dataset";

export interface ProviderProps extends PropsWithChildren, ThemeProviderProps {
  datasets: Dataset[];
  experiments: Experiment[];
}

export function Provider(props: ProviderProps) {
  const { datasets, experiments, children, ...rest } = props;

  return (
    <ThemeProvider {...rest}>
      <DatasetsProvider datasets={datasets}>
        <ExperimentsProvider experiments={experiments}>
          {children}
        </ExperimentsProvider>
      </DatasetsProvider>
    </ThemeProvider>
  );
}
