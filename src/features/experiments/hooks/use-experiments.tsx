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
import { Experiment } from "../interfaces/experiment";

export interface IExperimentsContext {
  experiments: Experiment[];
  setExperiments: Dispatch<SetStateAction<Experiment[]>>;
  addExperiment: (experiment: Experiment) => void;
  updateExperiment: (experiment: Experiment) => void;
}

export const ExperimentsContext = createContext<
  IExperimentsContext | undefined
>(undefined);

export interface ExperimentsProviderProps extends PropsWithChildren {
  experiments: Experiment[];
}

export function ExperimentsProvider(props: ExperimentsProviderProps) {
  const { experiments, children } = props;
  const [localExperiments, setLocalExperiments] =
    useState<Experiment[]>(experiments);

  useEffect(() => {
    setLocalExperiments(experiments);
  }, [experiments]);

  const addExperiment = (newExperiment: Experiment) => {
    setLocalExperiments((prev) => [...prev, newExperiment]);
  };

  const updateExperiment = (updatedExperiment: Experiment) => {
    setLocalExperiments((prev) =>
      prev.map((experiment) =>
        experiment.id === updatedExperiment.id ? updatedExperiment : experiment,
      ),
    );
  };

  return (
    <ExperimentsContext.Provider
      value={{
        experiments: localExperiments,
        setExperiments: setLocalExperiments,
        addExperiment,
        updateExperiment,
      }}
    >
      {children}
    </ExperimentsContext.Provider>
  );
}

export function useExperiments() {
  const context = useContext(ExperimentsContext);

  if (!context) {
    throw new Error("useExperiments must be used within a ExperimentsProvider");
  }

  return context;
}
