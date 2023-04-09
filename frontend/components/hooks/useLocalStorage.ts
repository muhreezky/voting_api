import { useState, useEffect } from "react";

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState<string | null>("");
  
  useEffect(() => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, "");
    }

    if (value !== null && value.length > 0) {
      localStorage.setItem(key, value);
    }

    if (value === undefined) {
      localStorage.removeItem(key);
    }
  }, [key, value]);

  // const deleteItem = () => localStorage.removeItem(key);

  return [value, setValue] as const;
}