import type { DateInput } from "./format-date";
import { parseDateInput } from "./format-date";

/**
 * Returns true if the given value represents today's date in the local timezone.
 */
export const isToday = (input: DateInput): boolean => {
  const d = parseDateInput(input);
  if (!d) return false;

  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};
