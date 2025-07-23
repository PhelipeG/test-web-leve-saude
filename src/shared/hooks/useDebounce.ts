import { useEffect, useState } from 'react';

interface DebounceProps {
  value: string;
  delay: number;
}

export function useDebounce({ value, delay }: DebounceProps): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
