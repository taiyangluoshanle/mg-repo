/**
 * Narrows `value` to `string` when it is a string primitive.
 */
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};
