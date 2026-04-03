const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape HTML special characters so text is safe for HTML text nodes */
export const escapeHtml = (str: string): string => {
  if (typeof str !== "string") return "";
  if (str.length === 0) return "";
  return str.replace(/[&<>"']/g, (ch) => HTML_ENTITIES[ch] ?? ch);
};
