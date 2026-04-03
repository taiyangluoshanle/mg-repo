/** Convert kebab-case (or snake_case with hyphens) to camelCase */
export const kebabToCamel = (str: string): string => {
  if (typeof str !== "string") return "";
  if (str.length === 0) return "";

  return str.replace(/[-_]+([a-zA-Z0-9])/g, (_, char: string) =>
    char.toUpperCase()
  );
};
