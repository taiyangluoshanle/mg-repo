/**
 * Safely reads and parses JSON from sessionStorage, returning `fallback` when missing, invalid, or unavailable.
 */
export const sessionGet = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.sessionStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

/**
 * Safely stringifies and writes a value to sessionStorage; returns whether the write succeeded.
 */
export const sessionSet = (key: string, value: unknown): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};
