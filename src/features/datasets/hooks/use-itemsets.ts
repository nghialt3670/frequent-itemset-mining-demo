import { useEffect, useMemo, useState } from "react";
import { UseStore } from "idb-keyval";
import to from "await-to-js";
import { fetchAndCacheFile, readFileToText } from "@/utils/file.utils";
import { Itemset } from "@/features/experiments/interfaces/itemset";

export function useItemsets(url: string, store?: UseStore) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [itemsetsText, setItemsetsText] = useState<string>();

  useEffect(() => {
    const fetchAndCacheItemsFile = async () => {
      setLoading(true);

      const [fetchError, itemsFile] = await to(fetchAndCacheFile(url, store));

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      const [readError, itemsText] = await to(readFileToText(itemsFile));

      if (readError) {
        setError(readError.message);
        setLoading(false);
        return;
      }

      setItemsetsText(itemsText);
      setLoading(false);
    };

    if (!itemsetsText) {
      fetchAndCacheItemsFile();
    }
  }, [url]);

  const itemsets: Itemset[] = useMemo(() => {
    if (!itemsetsText) {
      return [];
    }

    return itemsetsText
      .split("\n")
      .map((line) =>
        line
          .trim()
          .split(" : ")
          .map((part) => part.trim()),
      )
      .map((parts) => ({
        itemIds: parts[0].split(" "),
        support: Number(parts[1]),
      }));
  }, [itemsetsText]);

  return { loading, error, itemsets };
}
