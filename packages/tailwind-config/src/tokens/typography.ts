export const fontFamily = {
  sans: ["Bluetti", "ui-sans-serif", "system-ui", "sans-serif"],
  serif: ["Bluetti", "Palatino", "ui-serif"],
  mono: ["JetBrains Mono", "Fira Code", "monospace"],
  display: ["Sora", "Noto Sans SC", "sans-serif"],
  bluetti: ["Bluetti"],
  bluetti2: ["Bluetti2"],
  poppins: ["Poppins"],
};

export const fontSize = {
  "2xs": ["0.625rem", { lineHeight: "1.5" }] as const, // 10px / 15px
  xs: ["0.75rem", { lineHeight: "1.5" }] as const, // 12px / 18px
  sm: ["0.875rem", { lineHeight: "1.25rem" }] as const, // 14px / 20px
  base: ["1rem", { lineHeight: "1.5rem" }] as const, // 16px / 24px
  lg: ["1.125rem", { lineHeight: "1.625rem" }] as const, // 18px / 26px
  xl: ["1.25rem", { lineHeight: "1.75rem" }] as const, // 20px / 28px
  "2xl": ["1.375rem", { lineHeight: "1.625rem" }] as const, // 22px / 26px
  "3xl": ["1.5rem", { lineHeight: "1.875rem" }] as const, // 24px / 30px
  "4xl": ["1.75rem", { lineHeight: "2.125rem" }] as const, // 28px / 34px
  "5xl": ["2rem", { lineHeight: "2.5rem" }] as const, // 32px / 40px
  "6xl": ["2.5rem", { lineHeight: "3rem" }] as const, // 40px / 48px
  "7xl": ["3rem", { lineHeight: "3.5rem" }] as const, // 48px / 56px
  "8xl": ["3.75rem", { lineHeight: "4.25rem" }] as const, // 60px / 68px
  "9xl": ["4.5rem", { lineHeight: "5rem" }] as const, // 72px / 80px
};

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
};
