import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, time: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), time);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
}
