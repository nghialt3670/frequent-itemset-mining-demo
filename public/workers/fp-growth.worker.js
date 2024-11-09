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

import { FPGrowth } from "node-fpgrowth";

self.onmessage = (event) => {
  const { support, transactionsFile } = event.data;
  const reader = new FileReader();

  reader.onload = () => {
    const fileContent = reader.result;
    const transactions = fileContent
      .trim()
      .split("\n")
      .map((line) => line.split(" ").map((item) => item.trim()));

    const start = performance.now();

    new FPGrowth(support)
      .exec(transactions)
      .then((itemsets) => {
        const end = performance.now();
        const runTime = Math.round(end - start);

        const itemsetsText = itemsets
          .map((itemset) => `${itemset.items.join(" ")} : ${itemset.support}`)
          .join("\n");

        const blob = new Blob([itemsetsText], { type: "text/plain" });
        const filename = `fp-growth-${support}-${runTime}.txt`;
        const itemsetsFile = new File([blob], filename, { type: "text/plain" });

        self.postMessage({
          quantity: itemsets.length,
          runTime,
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
