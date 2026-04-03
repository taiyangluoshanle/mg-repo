import type { DateInput } from "./format-date";
import { parseDateInput } from "./format-date";

const MS_PER_DAY = 86_400_000;

/** Returns midnight at the start of the date in the local timezone. */
const startOfLocalDay = (date: Date): Date => {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Returns the absolute number of whole local calendar days between two dates, or null if either input is invalid.
 */
export const daysBetween = (a: DateInput, b: DateInput): number | null => {
  const da = parseDateInput(a);
  const db = parseDateInput(b);
  if (!da || !db) return null;

  const startA = startOfLocalDay(da).getTime();
  const startB = startOfLocalDay(db).getTime();
  return Math.round(Math.abs(startB - startA) / MS_PER_DAY);
};
