import { Set as ImmutableSet } from "immutable";
import { useMemo, useState } from "react";
import _ from "lodash";
import { generateAssociationRules } from "../utils/generate-association-rules";
import { useItemsets } from "@/features/datasets/hooks/use-itemsets";
import { useItems } from "@/features/datasets/hooks/use-items";
import { Item } from "@/features/datasets/interfaces/item";
import { MultiSelect } from "@/components/ui/multi-select";
import { Experiment } from "../interfaces/experiment";
import { useDebounce } from "@/hooks/use-debounce";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CONFIDENCE_STEPS = 0.001;
const DEFAULT_CONFIDENCE = 0.5;

export interface AssociationRuleMiningProps {
  experiment: Experiment;
}

export function AssociationRuleMining(props: AssociationRuleMiningProps) {
  const { experiment } = props;
  const { dataset } = experiment;
  const { items } = useItems(dataset.items.fileSource);
  const { itemsets } = useItemsets(experiment.itemsets!.fileSource);

  const [antecedent, setAntecedent] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number>(DEFAULT_CONFIDENCE);
  const debouncedConfidence = useDebounce(confidence, 500);

  const associationRules = useMemo(
    () =>
      generateAssociationRules(itemsets)
        .filter((rule) => rule.confidence >= confidence)
        .filter((rule) =>
          _.isEqual(Array.from(rule.antecedent), Array.from(antecedent)),
        )
        .sort((rule1, rule2) => rule2.confidence - rule1.confidence),
    [itemsets, debouncedConfidence],
  );

  const idToItem = useMemo(
    () =>
      items.reduce<Record<string, Item>>((map, item) => {
        map[item.id] = item;
        return map;
      }, {}),
    [items],
  );

  const frequentItems: Item[] = useMemo(() => {
    const itemIdSet = itemsets.reduce<Set<string>>((prev, itemset) => {
      itemset.itemIds.forEach((id) => prev.add(id));
      return prev;
    }, new Set());

    return Array.from(itemIdSet).map((itemId) => idToItem[itemId]);
  }, [itemsets, idToItem]);

  const itemOptions = useMemo(() => {
    return frequentItems
      .filter((item) => {
        for (const itemset of itemsets) {
          if (
            ImmutableSet([...antecedent, item.id]).isSubset(itemset.itemIds)
          ) {
            return true;
          }
        }

        return false;
      })
      .map((item) => ({ label: item.name, value: item.id }));
  }, [frequentItems, antecedent]);

  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label htmlFor="antecedent">If a custommer buy:</Label>
        <MultiSelect
          name="antecedent"
          placeholder="Select antecedent"
          options={itemOptions}
          value={antecedent}
          onValueChange={setAntecedent}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="support" className="col-span-2">
          With the minimum support of {experiment.support} and the minimum
          confidence of:
        </Label>
        <div className="grid grid-cols-10 gap-4">
          <Slider
            className="col-span-7 sm:col-span-8"
            min={0.0}
            max={1.0}
            step={CONFIDENCE_STEPS}
            value={[confidence]}
            onValueChange={(value) => setConfidence(value[0])}
          />
          <Input
            className="col-span-3 sm:col-span-2"
            type="number"
            min={0.0}
            max={1.0}
            step={CONFIDENCE_STEPS}
            onKeyDown={(e) => e.preventDefault()}
            onFocus={(e) => e.target.blur()}
            style={{ pointerEvents: "auto" }}
            value={confidence}
            onChange={(e) => setConfidence(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>
      <Label>He/she would also buy:</Label>
      <div className="h-[400px] overflow-y-scroll">
        {associationRules.length === 0 ? (
          <div>Nothing!</div>
        ) : (
          associationRules.map((rule) => (
            <div className="flex flex-row gap-2">
              <div className="flex flex-row">
                {rule.consequent
                  .map((itemId) => idToItem[itemId].name)
                  .join(", ")}
              </div>
              <div>({(rule.confidence * 100).toFixed(1)}%)</div>
            </div>
          ))
        )}
      </div>
    </form>
  );
}
