/** Convert a string to a URL-friendly slug (lowercase, hyphen-separated) */
export const slugify = (str: string): string => {
  if (typeof str !== "string") return "";
  if (str.length === 0) return "";

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
