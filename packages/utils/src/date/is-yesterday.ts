import type { DateInput } from "./format-date";
import { parseDateInput } from "./format-date";

/**
 * Returns true if the given value represents yesterday's date in the local timezone.
 */
export const isYesterday = (input: DateInput): boolean => {
  const d = parseDateInput(input);
  if (!d) return false;

  const y = new Date();
  y.setDate(y.getDate() - 1);
  return (
    d.getFullYear() === y.getFullYear() &&
    d.getMonth() === y.getMonth() &&
    d.getDate() === y.getDate()
  );
};
