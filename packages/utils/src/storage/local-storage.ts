/**
 * Safely reads and parses JSON from localStorage, returning `fallback` when missing, invalid, or unavailable.
 */
export const safeGetItem = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

/**
 * Safely stringifies and writes a value to localStorage; returns whether the write succeeded.
 */
export const safeSetItem = (key: string, value: unknown): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Safely removes a key from localStorage, ignoring errors when storage is unavailable.
 */
export const safeRemoveItem = (key: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    return;
  }
};
