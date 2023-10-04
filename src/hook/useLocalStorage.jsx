import { useState, useEffect } from "react";

export default function useLocalStorage(initiavlValue, key) {
  function getValue() {
    const storage = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage);
    }
    return initiavlValue;
  }

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
