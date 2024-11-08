import { Algorithm } from "../interfaces/experiment";

export interface FindFrequentItemsetsInput {
  algorithm: Algorithm;
  transactionsFile: File;
  support: number;
}

export interface FindFrequentItemsetsOutput {
  quantity: number;
  runTime: number;
  itemsetsFile: File;
}

export async function findFrequentItemsets(
  input: FindFrequentItemsetsInput,
): Promise<FindFrequentItemsetsOutput> {
  return new Promise((resolve, reject) => {
    const workerPath = `workers/${input.algorithm}.worker.bundle.js`;
    const worker = new Worker(workerPath);

    const startTime = performance.now();

    worker.postMessage({
      support: input.support,
      transactionsFile: input.transactionsFile,
    });

    worker.onerror = (e) => {
      reject(e);
    };

    worker.onmessage = (e) => {
      const endTime = performance.now();
      const runTime = Number(((endTime - startTime) / 1000).toFixed(3));

      const quantity = e.data.quantity as number;
      const itemsetsFile = e.data.itemsetsFile as File;

      resolve({ quantity, runTime, itemsetsFile });
    };
  });
}
