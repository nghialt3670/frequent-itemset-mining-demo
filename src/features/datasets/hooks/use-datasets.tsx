"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dataset } from "../interfaces/dataset";

export interface IDatasetsContext {
  datasets: Dataset[];
  setDatasets: Dispatch<SetStateAction<Dataset[]>>;
}

export const DatasetsContext = createContext<IDatasetsContext | undefined>(
  undefined,
);

export interface DatasetsProviderProps extends PropsWithChildren {
  datasets: Dataset[];
}

export function DatasetsProvider(props: DatasetsProviderProps) {
  const { datasets, children } = props;
  const [localDatasets, setLocalDatasets] = useState<Dataset[]>(datasets);

  useEffect(() => {
    setLocalDatasets(datasets);
  }, [datasets]);

  return (
    <DatasetsContext.Provider
      value={{ datasets: localDatasets, setDatasets: setLocalDatasets }}
    >
      {children}
    </DatasetsContext.Provider>
  );
}

export function useDatasets() {
  const context = useContext(DatasetsContext);

  if (!context) {
    throw new Error("useDatasets must be used within a DatasetsProvider");
  }

  return context;
}
