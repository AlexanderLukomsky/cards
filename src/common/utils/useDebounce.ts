import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutDelay = 500;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || timeoutDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
