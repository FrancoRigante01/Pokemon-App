import { useState, useEffect } from "react";

/**
 * Returns a debounced version of the input value.
 * @param value The value to debounce.
 * @param delay Delay in milliseconds.
 */
export const useDebounce = (value: string, delay = 300): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value.trim().toLowerCase()), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
