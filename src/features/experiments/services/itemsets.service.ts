import { get, set } from "idb-keyval";
import { Experiment } from "../interfaces/experiment";

export async function fetchAndCacheItemsetsFile(
  experiment: Experiment,
): Promise<File | null> {
  if (!experiment.itemsets) {
    throw new Error("Itemsets missing");
  }

  const cachedDatasetFiles = await get<File>(experiment.itemsets.fileSource);

  if (cachedDatasetFiles) {
    return cachedDatasetFiles;
  } else if (experiment.isLocal) {
    throw new Error("Failed to get cached local itemsets file");
  }

  const response = await fetch(experiment.itemsets.fileSource);

  const itemsetsBlob = await response.blob();
  const itemsetsFile = new File([itemsetsBlob], "itemsets.txt");

  await set(experiment.itemsets.fileSource, itemsetsFile);

  return itemsetsFile;
}
