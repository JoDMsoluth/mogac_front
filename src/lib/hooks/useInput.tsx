import { useState, useCallback, ChangeEvent } from 'react';

export default function useInput<T>(
  initialValue: T,
): [T, (e: ChangeEvent) => void] {
  const [value, setValue] = useState(initialValue);
  const changeValue = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value],
  );

  return [value, changeValue];
}
