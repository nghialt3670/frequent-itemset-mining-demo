import { Set as ImmutableSet } from "immutable";
import { AssociationRule } from "../interfaces/association-rule";
import { Itemset } from "../interfaces/itemset";

export function generateAssociationRules(
  itemsets: Itemset[],
): AssociationRule[] {
  const rules: AssociationRule[] = [];

  for (const itemset of itemsets) {
    const { itemIds, support } = itemset;
    const subsets = getAllNonEmptySubsets(itemIds);

    for (const antecedent of subsets) {
      const antecedentSet = new Set(antecedent);

      const consequent = itemIds.filter((item) => !antecedentSet.has(item));
      if (consequent.length === 0) continue; // Skip if no consequent items left

      const antecedentSupport = findSupport(antecedent, itemsets);
      const confidence = support / antecedentSupport;

      rules.push({
        antecedent,
        consequent,
        support,
        confidence,
      });
    }
  }

  return rules;
}

function getAllNonEmptySubsets<T>(items: T[]): T[][] {
  const subsets: T[][] = [];
  const n = items.length;

  for (let i = 1; i < 1 << n; i++) {
    const subset: T[] = [];
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) subset.push(items[j]);
    }
    subsets.push(subset);
  }

  return subsets;
}

function findSupport(subset: string[], itemsets: Itemset[]): number {
  for (const itemset of itemsets) {
    if (ImmutableSet(subset).isSubset(itemset.itemIds)) {
      return itemset.support;
    }
  }
  return 0;
}
