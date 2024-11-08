import { Dataset } from "../interfaces/dataset";

export const DATASETS: Dataset[] = [
  {
    id: "0",
    name: "Fruithut",
    description:
      "This is a dataset of customer transactions from a US retail store focusing on selling fruits.",
    items: {
      quantity: 1265,
      fileSource: "/datasets/fruithut/items.txt",
    },
    transactions: {
      quantity: 181970,
      fileSource: "/datasets/fruithut/transactions.txt",
    },
  },
];
