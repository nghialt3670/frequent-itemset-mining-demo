import { toast } from "sonner";
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

export interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard(props: DatasetCardProps) {
  const { dataset } = props;

  const handleDownloadClick = async () => {
    const responses = await Promise.all([
      fetch(dataset.items.fileSource),
      fetch(dataset.transactions.fileSource),
    ]);

    if (responses.some((response) => !response.ok)) {
      toast("Failed to download dataset");
      return;
    }

    const itemsBlob = await responses[0].blob();
    const transactionsBlob = await responses[1].blob();

    const zip = new JSZip();

    zip.file("items.txt", itemsBlob);
    zip.file("transactions.txt", transactionsBlob);

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
