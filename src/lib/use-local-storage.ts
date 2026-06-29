"use client";

import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch (error) {
      console.warn("Failed to read localStorage for", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn("Failed to write localStorage for", key, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
