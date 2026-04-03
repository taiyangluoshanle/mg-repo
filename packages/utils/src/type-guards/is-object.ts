/**
 * Narrows `value` to a plain object: not `null`, not an array, and `typeof` `"object"`.
 */
export const isObject = (
  value: unknown,
): value is Record<string, unknown> => {
  if (value === null || typeof value !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return false;
  }
  return true;
};
