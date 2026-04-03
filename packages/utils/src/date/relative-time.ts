import type { DateInput } from "./format-date";
import { parseDateInput } from "./format-date";

const MS_PER_DAY = 86_400_000;

/** Returns midnight at the start of the date in the local timezone. */
const startOfLocalDay = (date: Date): Date => {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Returns the non-negative count of local calendar days between two instants. */
const calendarDaysApart = (from: Date, to: Date): number => {
  const a = startOfLocalDay(from).getTime();
  const b = startOfLocalDay(to).getTime();
  return Math.round(Math.abs(b - a) / MS_PER_DAY);
};

/**
 * Builds a Chinese relative-time label for a past instant compared to a reference time (default: now).
 */
export const formatRelativeTime = (
  input: DateInput,
  reference: DateInput = new Date(),
): string => {
  const d = parseDateInput(input);
  const ref = parseDateInput(reference);
  if (!d || !ref) return "";

  const diffMs = ref.getTime() - d.getTime();
  if (diffMs < 0) return "刚刚";

  const dayDiff = calendarDaysApart(d, ref);

  if (dayDiff === 0) {
    const sec = Math.floor(diffMs / 1000);
    if (sec < 5) return "刚刚";
    if (sec < 60) return `${sec}秒前`;

    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}分钟前`;

    const hour = Math.floor(min / 60);
    return `${hour}小时前`;
  }

  if (dayDiff === 1) return "昨天";
  if (dayDiff < 7) return `${dayDiff}天前`;

  if (dayDiff < 30) {
    const weeks = Math.floor(dayDiff / 7);
    return `${weeks}周前`;
  }

  if (dayDiff < 365) {
    const months = Math.floor(dayDiff / 30);
    return `${months}个月前`;
  }

  const years = Math.floor(dayDiff / 365);
  return `${years}年前`;
};
