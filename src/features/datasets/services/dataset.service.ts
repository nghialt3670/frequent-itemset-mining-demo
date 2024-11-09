import { get, set } from "idb-keyval";
import { Dataset, DatasetFiles } from "../interfaces/dataset";

export async function fetchAndCacheDatasetFiles(
  dataset: Dataset,
): Promise<DatasetFiles> {
  const filesSrc = dataset.items.fileSource.concat(
    dataset.transactions.fileSource,
  );
  const cachedDatasetFiles = await get<DatasetFiles>(filesSrc);

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

  await set(filesSrc, datasetFiles);

  return datasetFiles;
}
