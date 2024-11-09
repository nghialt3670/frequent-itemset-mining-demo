import { useEffect, useMemo, useState } from "react";
import { UseStore } from "idb-keyval";
import to from "await-to-js";
import { fetchAndCacheFile, readFileToText } from "@/utils/file.utils";
import { Transaction } from "../interfaces/transaction";

export function useTransactions(url: string, store?: UseStore) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [transactionsText, setTransactionsText] = useState<string>();

  useEffect(() => {
    const fetchAndCacheItemsFile = async () => {
      setLoading(true);

      const [fetchError, transactionsFile] = await to(
        fetchAndCacheFile(url, store),
      );

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      const [readError, transactionsText] = await to(
        readFileToText(transactionsFile),
      );

      if (readError) {
        setError(readError.message);
        setLoading(false);
        return;
      }

      setTransactionsText(transactionsText);
      setLoading(false);
    };

    if (!transactionsText) {
      fetchAndCacheItemsFile();
    }
  }, [url]);

  const transactions: Transaction[] = useMemo(() => {
    if (!transactionsText) {
      return [];
    }

    return transactionsText
      .split("\n")
      .map((line) =>
        line
          .trim()
          .split(" ")
          .map((itemId) => itemId.trim()),
      )
      .map((itemIds) => ({ itemIds }));
  }, [transactionsText]);

  return { loading, error, transactions };
}
