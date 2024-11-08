import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";
import archiver from "archiver";
import { DATASETS } from "@/features/datasets/constants/datasets.constant";

export interface ParamsWithId {
  id: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const { id } = params;
  const dataset = DATASETS.find((dataset) => dataset.id === id);

  if (!dataset) {
    notFound();
  }

  const headers = new Headers({
    "Content-Type": "application/zip",
    "Content-Disposition": 'attachment; filename="dataset.zip"',
  });

  const readableStream = new ReadableStream({
    start(controller) {
      const archive = archiver("zip", { zlib: { level: 9 } });

      archive.on("data", (chunk) => controller.enqueue(chunk));
      archive.on("end", () => controller.close());
      archive.on("error", (err) => controller.error(err));

      archive.file(dataset.items.fileSource, { name: "items.txt" });
      archive.file(dataset.transactions.fileSource, {
        name: "transactions.txt",
      });

      archive.finalize();
    },
  });

  return new NextResponse(readableStream, { headers });
}
