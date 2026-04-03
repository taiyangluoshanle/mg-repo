/**
 * Narrows `value` to `number` when it is a finite number (excludes `NaN` and non-number types).
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && !Number.isNaN(value);
};
