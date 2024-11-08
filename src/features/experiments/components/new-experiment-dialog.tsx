"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { set } from "idb-keyval";
import to from "await-to-js";
import { z } from "zod";
import _ from "lodash";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAndCacheDatasetFiles } from "@/features/datasets/services/dataset.service";
import { findFrequentItemsets } from "../utils/find-frequent-itemsets";
import { useDatasets } from "@/features/datasets/hooks/use-datasets";
import { Algorithm, Experiment } from "../interfaces/experiment";
import { Button, ButtonProps } from "@/components/ui/button";
import { useExperiments } from "../hooks/use-experiments";
import { useIsMobile } from "@/hooks/use-mobile";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SUPPORT_STEPS = 0.001;
const DEFAULT_SUPPORT = 0.5;
const DEFAULT_ALGORITHM: Algorithm = "apriori";

export interface NewExperimentDialogProps extends ButtonProps {}

const NewExperimentSchema = z.object({
  datasetId: z.string().min(1, "Dataset is required"),
  algorithm: z.enum(["apriori", "fp-growth"], {
    errorMap: () => ({ message: "Algorithm is required" }),
  }),
  support: z.coerce
    .number()
    .min(0, "Support must be between 0 and 1")
    .max(1, "Support must be between 0 and 1"),
});

export function NewExperimentDialog(props: NewExperimentDialogProps) {
  const searchParams = useSearchParams();
  const { datasets } = useDatasets();
  const currDatasetId = searchParams.get("datasetId");
  const currDataset = currDatasetId
    ? datasets.find((dataset) => dataset.id === currDatasetId)
    : undefined;

  const { toast } = useToast();
  const { experiments, addExperiment, updateExperiment } = useExperiments();
  const isMobile = useIsMobile();

  const DEFAULT_DATASET_ID = currDataset ? currDataset.id : datasets[0].id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(NewExperimentSchema),
    defaultValues: {
      datasetId: DEFAULT_DATASET_ID,
      algorithm: DEFAULT_ALGORITHM,
      support: DEFAULT_SUPPORT,
    },
  });

  const onSubmit = async (data: any) => {
    const dataset = datasets.find((d) => d.id === data.datasetId)!;
    const [fetchError, datasetFiles] = await to(
      fetchAndCacheDatasetFiles(dataset),
    );

    if (fetchError) {
      toast({
        title: "Something went wrong!",
        description: "Failed to download dataset files.",
      });
      return;
    }

    const newExperiment: Experiment = {
      id: experiments.length.toString(),
      dataset: datasets.find((d) => d.id === data.datasetId)!,
      algorithm: data.algorithm,
      support: data.support,
      status: "running",
      isLocal: true,
    };
    addExperiment(newExperiment);

    const [findError, output] = await to(
      findFrequentItemsets({
        algorithm: newExperiment.algorithm,
        transactionsFile: datasetFiles.transactions,
        support: newExperiment.support,
      }),
    );

    if (findError) {
      console.log(findError.message);
      toast({
        title: "Experiment failed",
        description: `An error occur while running experiment ${newExperiment.id}.`,
      });
      newExperiment.status = "error";
      updateExperiment(newExperiment);
      return;
    }

    const { quantity, runTime, itemsetsFile } = output;

    await set(newExperiment.id, itemsetsFile);

    newExperiment.runTime = runTime;
    newExperiment.itemsets = {
      quantity,
      fileSource: newExperiment.id,
    };

    toast({
      title: "Experiment completed",
      description: `Experiment ${newExperiment.id} completed successfully`,
    });
    newExperiment.status = "done";
    updateExperiment(newExperiment);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>{isMobile ? "New" : "New experiment"}</Button>
      </DialogTrigger>
      <DialogContent className="w-4/5 md:max-w-[500px] rounded-xl">
        <DialogHeader>
          <DialogTitle>New experiment</DialogTitle>
          <DialogDescription>
            Create and run a new experiment directly in your browser.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid pt-6 space-y-6">
          <div className="grid grid-cols-9 sm:grid-cols-10 items-center gap-4">
            <Label htmlFor="datasetName" className="text-right col-span-2">
              Dataset
            </Label>
            {currDataset ? (
              <Input
                name="datasetName"
                className="col-span-7"
                value={currDataset.name}
                disabled
              />
            ) : (
              <Select
                name="datasetId"
                value={watch("datasetId")}
                defaultValue={DEFAULT_DATASET_ID}
                onValueChange={(value) => setValue("datasetId", value)}
              >
                <SelectTrigger className="col-span-7">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="col-span-7">
                  <SelectGroup>
                    {datasets.map((dataset) => (
                      <SelectItem key={dataset.id} value={dataset.id}>
                        {dataset.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            {errors.datasetId && (
              <span className="row-start-2 col-start-3 col-span-7 text-red-500">
                {errors.datasetId.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-9 sm:grid-cols-10 items-center gap-4">
            <Label htmlFor="algorithm" className="text-right col-span-2">
              Algorithm
            </Label>
            <Select
              name="algorithm"
              value={watch("algorithm")}
              defaultValue={DEFAULT_ALGORITHM}
              onValueChange={(value) =>
                setValue("algorithm", value as Algorithm)
              }
            >
              <SelectTrigger className="col-span-7">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="col-span-7">
                <SelectGroup>
                  <SelectItem value="apriori">Apriori</SelectItem>
                  <SelectItem value="fp-growth">FP-Growth</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.algorithm && (
              <span className="row-start-2 col-start-3 col-span-7 text-red-500">
                {errors.algorithm.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-9 grid-rows-2 sm:grid-cols-10 items-center gap-4">
            <Label htmlFor="support" className="text-right col-span-2">
              Support
            </Label>
            <Slider
              className="col-span-4 sm:col-span-5"
              min={0.0}
              max={1.0}
              step={SUPPORT_STEPS}
              value={[watch("support")]}
              onValueChange={(value) => setValue("support", value[0])}
            />
            <Input
              className="col-span-3 sm:col-span-2"
              type="number"
              min={0.0}
              max={1.0}
              step={SUPPORT_STEPS}
              {...register("support")}
              onKeyDown={(e) => e.preventDefault()}
              onFocus={(e) => e.target.blur()}
              style={{ pointerEvents: "auto" }}
              onChange={(e) =>
                setValue("support", parseFloat(e.target.value) || 0)
              }
            />
            {errors.support && (
              <span className="row-start-2 col-start-3 col-span-7 text-red-500">
                {errors.support.message}
              </span>
            )}
          </div>

          <DialogFooter>
            {_.isEmpty(errors) ? (
              <DialogClose asChild>
                <Button type="submit">Run</Button>
              </DialogClose>
            ) : (
              <Button type="submit">Run</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
