/**
 * Returns true if the string is a syntactically valid absolute URL (http, https, or other URL-supported schemes).
 */
export const isUrl = (value: string): boolean => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (trimmed === "") return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.href.length > 0;
  } catch {
    return false;
  }
};
