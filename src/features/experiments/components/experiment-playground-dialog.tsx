import { FlaskConical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipIconButton } from "@/components/custom/buttons/tooltip-icon-button";
import { AssociationRuleMining } from "./association-rule-mining";
import { Experiment } from "../interfaces/experiment";
import { ButtonProps } from "@/components/ui/button";

export interface ExperimentPlaygroundDialogProps extends ButtonProps {
  experiment: Experiment;
}

export function ExperimentPlaygroundDialog(
  props: ExperimentPlaygroundDialogProps,
) {
  const { experiment, ...rest } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TooltipIconButton text="Playground" {...rest}>
          <FlaskConical />
        </TooltipIconButton>
      </DialogTrigger>
      <DialogContent className="w-full rounded-xl">
        <DialogHeader>
          <DialogTitle>Playground</DialogTitle>
          <DialogDescription>
            Use frequent itemsets to explore association rules.
          </DialogDescription>
          <div className="py-8">
            <AssociationRuleMining experiment={experiment} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
