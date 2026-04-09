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
  "scale-out": {
    from: { transform: "scale(1)", opacity: "1" },
    to: { transform: "scale(0.95)", opacity: "0" },
  },
  spin: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  "enter-from-right": {
    from: { opacity: "0", transform: "translateX(200px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  "enter-from-left": {
    from: { opacity: "0", transform: "translateX(-200px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  "exit-to-right": {
    from: { opacity: "1", transform: "translateX(0)" },
    to: { opacity: "0", transform: "translateX(200px)" },
  },
  "exit-to-left": {
    from: { opacity: "1", transform: "translateX(0)" },
    to: { opacity: "0", transform: "translateX(-200px)" },
  },
  "slide-up-and-fade": {
    from: { opacity: "0", transform: "translateY(2px)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },
  "slide-right-and-fade": {
    from: { opacity: "0", transform: "translateX(-2px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  "slide-down-and-fade": {
    from: { opacity: "0", transform: "translateY(-2px)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },
  "slide-left-and-fade": {
    from: { opacity: "0", transform: "translateX(2px)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  hide: {
    from: { opacity: "1" },
    to: { opacity: "0" },
  },
  "slide-in": {
    from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
    to: { transform: "translateX(0)" },
  },
  "swipe-out": {
    from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
    to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
  },
};

export const animation = {
  "fade-in": "fade-in 200ms ease-out",
  "fade-out": "fade-out 200ms ease-in",
  "slide-up": "slide-up 300ms ease-out",
  "slide-down": "slide-down 300ms ease-out",
  "scale-in": "scale-in 200ms ease-out",
  "scale-out": "scale-out 200ms ease",
  spin: "spin 1s linear infinite",
  "spin-slow": "spin 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  "enter-from-right": "enter-from-right 250ms ease",
  "enter-from-left": "enter-from-left 250ms ease",
  "exit-to-right": "exit-to-right 250ms ease",
  "exit-to-left": "exit-to-left 250ms ease",
  "slide-up-and-fade": "slide-up-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-right-and-fade": "slide-right-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-down-and-fade": "slide-down-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-left-and-fade": "slide-left-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
  "accordion-down": "accordion-down 0.3s ease-out",
  "accordion-up": "accordion-up 0.3s ease-out",
  hide: "hide 100ms ease-in",
  "slide-in": "slide-in 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  "swipe-out": "swipe-out 100ms ease-out",
};
