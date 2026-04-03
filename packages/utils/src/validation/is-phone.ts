/**
 * Returns true if the string is a Chinese mainland mobile number (11 digits starting with 1).
 */
export const isPhone = (value: string): boolean => {
  if (typeof value !== "string") return false;
  const digits = value.replace(/\s/g, "");
  return /^1\d{10}$/.test(digits);
};
