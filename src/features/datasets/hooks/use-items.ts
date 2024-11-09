import { useEffect, useMemo, useState } from "react";
import { UseStore } from "idb-keyval";
import to from "await-to-js";
import { fetchAndCacheFile, readFileToText } from "@/utils/file.utils";
import { Item } from "../interfaces/item";

export function useItems(url: string, store?: UseStore) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [itemsText, setItemsText] = useState<string>();

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

      setItemsText(itemsText);
      setLoading(false);
    };

    if (!itemsText) {
      fetchAndCacheItemsFile();
    }
  }, [url]);

  const items: Item[] = useMemo(() => {
    if (!itemsText) {
      return [];
    }

    return itemsText
      .split("\n")
      .map((line) =>
        line
          .trim()
          .split(": ")
          .map((part) => part.trim()),
      )
      .map((parts) => ({ id: parts[0], name: parts[1] }));
  }, [itemsText]);

  return { loading, error, items };
}
