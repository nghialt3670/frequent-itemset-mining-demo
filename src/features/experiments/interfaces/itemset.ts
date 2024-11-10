export interface Itemset {
  itemIds: string[];
  support: number;
}

export interface Consequent extends Itemset {
  confidence: number;
}
