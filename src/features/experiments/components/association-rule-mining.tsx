import { useMemo, useState } from "react";
import { useTransactions } from "@/features/datasets/hooks/use-transactions";
import { useItems } from "@/features/datasets/hooks/use-items";
import { Item } from "@/features/datasets/interfaces/item";
import { MultiSelect } from "@/components/ui/multi-select";
import { Experiment } from "../interfaces/experiment";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SUPPORT_STEPS = 0.001;
const DEFAULT_SUPPORT = 0.5;

export interface AssociationRuleMiningProps {
  experiment: Experiment;
}

export function AssociationRuleMining(props: AssociationRuleMiningProps) {
  const { experiment } = props;
  const { items } = useItems(experiment.dataset.items.fileSource);
  const { transactions } = useTransactions(
    experiment.dataset.transactions.fileSource,
  );
  const { transactions: itemsets } = useTransactions(
    experiment.itemsets!.fileSource,
  );
  const [antecedent, setAntecedent] = useState<string[]>([]);
  const [consequent, setConsequent] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number>(DEFAULT_SUPPORT);

  consequent;

  const sortedItems = useMemo(() => {
    const itemCounts: Record<string, number> = {};

    transactions.forEach((transaction) =>
      transaction.itemIds.forEach(
        (itemId) => (itemCounts[itemId] = (itemCounts[itemId] ?? 0) + 1),
      ),
    );

    return items
      .map((item) => ({
        ...item,
        supportCount: itemCounts[item.id],
      }))
      .sort((item1, item2) => item2.supportCount - item1.supportCount);
  }, [items, transactions]);

  const itemOptions = sortedItems.slice(0, 10).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label htmlFor="antecedent">Antecedent</Label>
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
          Confidence
        </Label>
        <div className="grid grid-cols-10 gap-4">
          <Slider
            className="col-span-7 sm:col-span-8"
            min={0.0}
            max={1.0}
            step={SUPPORT_STEPS}
            value={[confidence]}
            onValueChange={(value) => setConfidence(value[0])}
          />
          <Input
            className="col-span-3 sm:col-span-2"
            type="number"
            min={0.0}
            max={1.0}
            step={SUPPORT_STEPS}
            onKeyDown={(e) => e.preventDefault()}
            onFocus={(e) => e.target.blur()}
            style={{ pointerEvents: "auto" }}
            value={confidence}
            onChange={(e) => setConfidence(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>
    </div>
  );
}
