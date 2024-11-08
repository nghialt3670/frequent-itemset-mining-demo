if (typeof process === "undefined") {
  window.process = {
    hrtime: function (start) {
      const now = Date.now() / 1000;
      if (start) {
        const seconds = now - start[0];
        const nanoseconds = (seconds - Math.floor(seconds)) * 1e9;
        return [Math.floor(seconds), Math.floor(nanoseconds)];
      }
      return [Math.floor(now), (now % 1) * 1e9];
    },
  };
} else if (typeof process.hrtime === "undefined") {
  process.hrtime = function (start) {
    const now = Date.now() / 1000;
    if (start) {
      const seconds = now - start[0];
      const nanoseconds = (seconds - Math.floor(seconds)) * 1e9;
      return [Math.floor(seconds), Math.floor(nanoseconds)];
    }
    return [Math.floor(now), (now % 1) * 1e9];
  };
}

import { Apriori } from "node-apriori";

self.onmessage = (event) => {
  const { support, transactionsFile } = event.data;
  const reader = new FileReader();

  reader.onload = () => {
    const fileContent = reader.result;
    const transactions = fileContent
      .trim()
      .split("\n")
      .map((line) => line.split(" ").map((item) => item.trim()));

    new Apriori(support)
      .exec(transactions)
      .then((result) => {
        const itemsetsText = result.itemsets
          .map((itemset) => itemset.items.join(" "))
          .join("\n");

        const blob = new Blob([itemsetsText], { type: "text/plain" });
        const itemsetsFile = new File([blob], `frequent-itemsets.txt`, {
          type: "text/plain",
        });

        self.postMessage({
          quantity: result.itemsets.length,
          itemsetsFile,
        });
      })
      .catch((error) => {
        self.postMessage({ error: error.message });
      });
  };

  reader.onerror = () => {
    self.postMessage({ error: "Failed to read the transactions file." });
  };

  reader.readAsText(transactionsFile);
};
