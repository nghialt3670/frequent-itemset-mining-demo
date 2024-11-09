import { get, set, UseStore } from "idb-keyval";

export async function fetchAndCacheFile(
  url: string,
  store?: UseStore,
): Promise<File> {
  const cachedFile = await get<File>(url, store);

  if (cachedFile) {
    return cachedFile;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch file from the url");
  }

  const blob = await response.blob();
  const filename = url.substring(url.lastIndexOf("/") + 1);
  const file = new File([blob], filename);

  await set(url, file, store);

  return file;
}

export async function readFileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result?.toString();
      if (text) {
        resolve(text);
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = (e) => reject(e);

    reader.readAsText(file);
  });
}
