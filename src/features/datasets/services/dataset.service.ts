import { createStore, get, set } from "idb-keyval";
import { Dataset, DatasetFiles } from "../interfaces/dataset";

// const datasetStore = createStore("fim", "datasets")

export async function fetchAndCacheDatasetFiles(
  dataset: Dataset,
): Promise<DatasetFiles> {
  const cachedDatasetFiles = await get<DatasetFiles>(dataset.id);

  if (cachedDatasetFiles) {
    return cachedDatasetFiles;
  }

  const responses = await Promise.all([
    fetch(dataset.items.fileSource),
    fetch(dataset.items.fileSource),
  ]);

  if (responses.some((response) => !response.ok)) {
    throw new Error("Failed to fetch dataset files");
  }

  const itemsBlob = await responses[0].blob();
  const transactionsBlob = await responses[1].blob();

  const itemsFile = new File([itemsBlob], "items.txt");
  const transactionsFile = new File([transactionsBlob], "transactions.txt");

  const datasetFiles: DatasetFiles = {
    items: itemsFile,
    transactions: transactionsFile,
  };

  await set(dataset.id, datasetFiles);

  return datasetFiles;
}
