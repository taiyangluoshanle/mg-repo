export const fontFamily = {
  sans: ["Noto Sans SC", "system-ui", "sans-serif"],
  display: ["Sora", "Noto Sans SC", "sans-serif"],
  mono: ["JetBrains Mono", "Fira Code", "monospace"],
};

export const fontSize = {
  xs: ["0.75rem", { lineHeight: "1rem" }] as const,
  sm: ["0.875rem", { lineHeight: "1.25rem" }] as const,
  base: ["1rem", { lineHeight: "1.5rem" }] as const,
  lg: ["1.125rem", { lineHeight: "1.75rem" }] as const,
  xl: ["1.25rem", { lineHeight: "1.75rem" }] as const,
  "2xl": ["1.563rem", { lineHeight: "2rem" }] as const,
  "3xl": ["1.953rem", { lineHeight: "2.25rem" }] as const,
  "4xl": ["2.441rem", { lineHeight: "2.5rem" }] as const,
  "5xl": ["3.052rem", { lineHeight: "1" }] as const,
};

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
};
