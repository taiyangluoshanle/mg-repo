export type DateInput = Date | string | number;

const TOKEN_ORDER = ["YYYY", "YY", "MM", "DD", "HH", "mm", "ss"] as const;

/** Pads a number to two digits with leading zeros. */
const pad2 = (n: number): string => String(n).padStart(2, "0");

/**
 * Converts a date-like value to a Date instance, or null if the value is invalid.
 */
export const parseDateInput = (input: DateInput): Date | null => {
  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) return null;
    return input;
  }
  if (typeof input === "number") {
    if (!Number.isFinite(input)) return null;
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (trimmed === "") return null;
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return null;
  return d;
};

/**
 * Formats a date using a pattern string (supports YYYY, YY, MM, DD, HH, mm, ss).
 */
export const formatDate = (input: DateInput, pattern: string): string => {
  const d = parseDateInput(input);
  if (!d) return "";

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  const tokens: Record<(typeof TOKEN_ORDER)[number], string> = {
    YYYY: String(year),
    YY: pad2(year % 100),
    MM: pad2(month),
    DD: pad2(day),
    HH: pad2(hours),
    mm: pad2(minutes),
    ss: pad2(seconds),
  };

  let result = pattern;
  for (const key of TOKEN_ORDER) {
    result = result.split(key).join(tokens[key]);
  }
  return result;
};
