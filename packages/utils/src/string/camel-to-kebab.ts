/** Convert camelCase or PascalCase to kebab-case */
export const camelToKebab = (str: string): string => {
  if (typeof str !== "string") return "";
  if (str.length === 0) return "";

  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
};
