import Link from "next/link";
import JSZip from "jszip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dataset } from "../interfaces/dataset";
import to from "await-to-js";
import { fetchAndCacheFile } from "@/utils/file.utils";
import { useToast } from "@/hooks/use-toast";

export interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard(props: DatasetCardProps) {
  const { dataset } = props;
  const { toast } = useToast();

  const handleDownloadClick = async () => {
    const [error, files] = await to(Promise.all([
      fetchAndCacheFile(dataset.items.fileSource),
      fetchAndCacheFile(dataset.transactions.fileSource)
    ]))

    if (error) {
      toast({
        title: "Something went wrong!",
        description: "Failed to download dataset files"
      })
      return;
    }

    const zip = new JSZip();

    const itemsFile = files[0]
    const transactionsFile = files[1]

    zip.file(itemsFile.name, itemsFile);
    zip.file(transactionsFile.name, transactionsFile);

    zip.generateAsync({ type: "blob" }).then(function (content) {
      const link = document.createElement("a");
      
      link.href = URL.createObjectURL(content);
      link.download = `${dataset.name.toLowerCase()}.zip`;
      link.click();

      URL.revokeObjectURL(link.href);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{dataset.name}</CardTitle>
        <CardDescription>{dataset.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <label className="italic">Number of items: </label>
          <span className="font-semibold">{dataset.items.quantity}</span>
        </div>
        <div>
          <label className="italic">Number of transactions: </label>
          <span className="font-semibold">{dataset.transactions.quantity}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Link href={`/experiments?datasetId=${dataset.id}`}>
          <Button>Experiment</Button>
        </Link>
        <Link href={`/datasets/${dataset.id}`}>
          <Button variant="secondary">Details</Button>
        </Link>
        <Button
          className="ml-auto"
          variant={"link"}
          onClick={handleDownloadClick}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
