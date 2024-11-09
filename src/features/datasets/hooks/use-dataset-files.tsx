"use client";

import { useState, useEffect } from "react";
import { clear } from "idb-keyval";
import { to } from "await-to-js";
import { fetchAndCacheDatasetFiles } from "../services/dataset.service";
import { Dataset, DatasetFiles } from "../interfaces/dataset";

export function useDatasetFiles(dataset: Dataset) {
  const [datasetFiles, setDatasetFiles] = useState<DatasetFiles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAndSetDatasetFiles = async () => {
      setLoading(true);

      const [error, datasetFiles] = await to(
        fetchAndCacheDatasetFiles(dataset),
      );

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setDatasetFiles(datasetFiles);
      setLoading(false);
    };

    getAndSetDatasetFiles();

    const handleBeforeUnload = () => {
      clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dataset]);

  return { datasetFiles, loading, error };
}
