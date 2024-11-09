import { DATASETS } from "@/features/datasets/constants/datasets.constant";
import { Experiment } from "../interfaces/experiment";

export const EXPERIMENTS: Experiment[] = [
  {
    id: "0",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 9799217,
    support: 0.001,
    itemsets: {
      quantity: 2763,
      fileSource: "experiments/fruithut-apriori-0.001-9799217.txt",
    },
    status: "done",
  },
  {
    id: "1",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 2407709,
    support: 0.002,
    itemsets: {
      quantity: 1030,
      fileSource: "experiments/fruithut-apriori-0.002-2407709.txt",
    },
    status: "done",
  },
  {
    id: "2",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 882410,
    support: 0.003,
    itemsets: {
      quantity: 559,
      fileSource: "experiments/fruithut-apriori-0.003-882410.txt",
    },
    status: "done",
  },
  {
    id: "3",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 338420,
    support: 0.004,
    itemsets: {
      quantity: 370,
      fileSource: "experiments/fruithut-apriori-0.004-338420.txt",
    },
    status: "done",
  },
  {
    id: "4",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 164503,
    support: 0.005,
    itemsets: {
      quantity: 281,
      fileSource: "experiments/fruithut-apriori-0.005-164503.txt",
    },
    status: "done",
  },
  {
    id: "5",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 127441,
    support: 0.006,
    itemsets: {
      quantity: 223,
      fileSource: "experiments/fruithut-apriori-0.006-127441.txt",
    },
    status: "done",
  },
  {
    id: "6",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 87133,
    support: 0.007,
    itemsets: {
      quantity: 190,
      fileSource: "experiments/fruithut-apriori-0.007-87133.txt",
    },
    status: "done",
  },
  {
    id: "7",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 64463,
    support: 0.008,
    itemsets: {
      quantity: 156,
      fileSource: "experiments/fruithut-apriori-0.008-64463.txt",
    },
    status: "done",
  },
  {
    id: "8",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 31251,
    support: 0.009,
    itemsets: {
      quantity: 133,
      fileSource: "experiments/fruithut-apriori-0.009-31251.txt",
    },
    status: "done",
  },
  {
    id: "9",
    dataset: DATASETS[0],
    algorithm: "apriori",
    runTime: 23698,
    support: 0.01,
    itemsets: {
      quantity: 122,
      fileSource: "experiments/fruithut-apriori-0.01-23698.txt",
    },
    status: "done",
  },
  {
    id: "10",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 3763,
    support: 0.001,
    itemsets: {
      quantity: 2763,
      fileSource: "experiments/fruithut-fp-growth-0.001-3763.txt",
    },
    status: "done",
  },
  {
    id: "11",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 2569,
    support: 0.002,
    itemsets: {
      quantity: 1030,
      fileSource: "experiments/fruithut-fp-growth-0.002-2569.txt",
    },
    status: "done",
  },
  {
    id: "12",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 2077,
    support: 0.003,
    itemsets: {
      quantity: 559,
      fileSource: "experiments/fruithut-fp-growth-0.003-2077.txt",
    },
    status: "done",
  },
  {
    id: "13",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 1835,
    support: 0.004,
    itemsets: {
      quantity: 370,
      fileSource: "experiments/fruithut-fp-growth-0.004-1835.txt",
    },
    status: "done",
  },
  {
    id: "14",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 1460,
    support: 0.005,
    itemsets: {
      quantity: 281,
      fileSource: "experiments/fruithut-fp-growth-0.005-1460.txt",
    },
    status: "done",
  },
  {
    id: "15",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 1384,
    support: 0.006,
    itemsets: {
      quantity: 223,
      fileSource: "experiments/fruithut-fp-growth-0.006-1384.txt",
    },
    status: "done",
  },
  {
    id: "16",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 1239,
    support: 0.007,
    itemsets: {
      quantity: 190,
      fileSource: "experiments/fruithut-fp-growth-0.007-1239.txt",
    },
    status: "done",
  },
  {
    id: "17",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 1145,
    support: 0.008,
    itemsets: {
      quantity: 156,
      fileSource: "experiments/fruithut-fp-growth-0.008-1145.txt",
    },
    status: "done",
  },
  {
    id: "18",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 1110,
    support: 0.009,
    itemsets: {
      quantity: 133,
      fileSource: "experiments/fruithut-fp-growth-0.009-1110.txt",
    },
    status: "done",
  },
  {
    id: "19",
    dataset: DATASETS[0],
    algorithm: "fp-growth",
    runTime: 863,
    support: 0.01,
    itemsets: {
      quantity: 122,
      fileSource: "experiments/fruithut-fp-growth-0.01-863.txt",
    },
    status: "done",
  },
];
