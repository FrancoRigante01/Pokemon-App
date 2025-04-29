import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay = 300): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value.trim().toLowerCase()), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
