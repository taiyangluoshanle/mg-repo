/**
 * Returns true when the value is null, undefined, blank string, an empty array, or an empty plain object.
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value !== "object") return false;
  if (Object.prototype.toString.call(value) !== "[object Object]") return false;
  return Object.keys(value as Record<string, unknown>).length === 0;
};
