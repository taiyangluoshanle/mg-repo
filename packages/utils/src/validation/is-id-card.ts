const WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] as const;
const CHECK_CODES = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"] as const;

/** Returns true if the year is a leap year in the Gregorian calendar. */
const isLeapYear = (year: number): boolean =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

/** Returns the number of days in the given month (1–12) for the year. */
const daysInMonth = (year: number, month: number): number => {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  if ([4, 6, 9, 11].includes(month)) return 30;
  return 31;
};

/** Returns true when the given calendar components form a valid date in range. */
const isValidBirthDate = (year: number, month: number, day: number): boolean => {
  if (year < 1900 || year > 2099) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > daysInMonth(year, month)) return false;
  return true;
};

/**
 * Returns true if the string is a valid 18-digit Chinese resident ID number (checksum and birth date verified).
 */
export const isIdCard = (value: string): boolean => {
  if (typeof value !== "string") return false;
  const v = value.trim().toUpperCase();
  if (!/^\d{17}[\dX]$/.test(v)) return false;

  const year = Number(v.slice(6, 10));
  const month = Number(v.slice(10, 12));
  const day = Number(v.slice(12, 14));
  if (!isValidBirthDate(year, month, day)) return false;

  let sum = 0;
  for (let i = 0; i < 17; i += 1) {
    const digit = Number(v[i]);
    if (!Number.isInteger(digit)) return false;
    sum += digit * WEIGHTS[i]!;
  }

  const expected = CHECK_CODES[sum % 11];
  return v[17] === expected;
};
