/**
 * Narrows `value` with `Array.isArray` to `T[]` (defaults to `unknown[]`).
 */
export const isArray = <T = unknown>(value: unknown): value is T[] => {
  return Array.isArray(value);
};
