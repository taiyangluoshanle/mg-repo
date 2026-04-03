/** Truncate a string to a maximum length and append a suffix when shortened */
export const truncate = (
  str: string,
  maxLength: number,
  suffix = "..."
): string => {
  if (typeof str !== "string") return "";
  if (!Number.isFinite(maxLength) || maxLength < 0) return str;
  if (str.length <= maxLength) return str;

  const safeSuffix = typeof suffix === "string" ? suffix : "...";
  if (maxLength <= safeSuffix.length) return safeSuffix.slice(0, maxLength);

  const headLength = maxLength - safeSuffix.length;
  return str.slice(0, headLength) + safeSuffix;
};
