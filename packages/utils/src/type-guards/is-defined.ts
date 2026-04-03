/**
 * Narrows `value` when it is neither `null` nor `undefined`.
 */
export const isDefined = <T>(
  value: T | undefined | null,
): value is T => {
  return value !== undefined && value !== null;
};
