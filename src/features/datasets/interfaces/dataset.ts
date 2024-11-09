export interface Items {
  quantity: number;
  fileSource: string;
}

export interface Transactions {
  quantity: number;
  fileSource: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  items: Items;
  transactions: Transactions;
  isLocal?: boolean;
}
