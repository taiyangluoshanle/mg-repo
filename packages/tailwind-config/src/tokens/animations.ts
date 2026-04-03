export const transitionDuration = {
  fast: "100ms",
  DEFAULT: "200ms",
  slow: "300ms",
  slower: "500ms",
};

export const transitionTimingFunction = {
  DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export const keyframes = {
  "fade-in": {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
  "fade-out": {
    from: { opacity: "1" },
    to: { opacity: "0" },
  },
  "slide-up": {
    from: { transform: "translateY(8px)", opacity: "0" },
    to: { transform: "translateY(0)", opacity: "1" },
  },
  "slide-down": {
    from: { transform: "translateY(-8px)", opacity: "0" },
    to: { transform: "translateY(0)", opacity: "1" },
  },
  "scale-in": {
    from: { transform: "scale(0.95)", opacity: "0" },
    to: { transform: "scale(1)", opacity: "1" },
  },
  spin: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
};

export const animation = {
  "fade-in": "fade-in 200ms ease-out",
  "fade-out": "fade-out 200ms ease-in",
  "slide-up": "slide-up 300ms ease-out",
  "slide-down": "slide-down 300ms ease-out",
  "scale-in": "scale-in 200ms ease-out",
  spin: "spin 1s linear infinite",
};
