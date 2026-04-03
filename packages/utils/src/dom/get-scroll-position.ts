/**
 * Returns the current window scroll offsets, or `{ x: 0, y: 0 }` when `window` is not available.
 */
export const getScrollPosition = (): { x: number; y: number } => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  const x = window.scrollX ?? window.pageXOffset ?? 0;
  const y = window.scrollY ?? window.pageYOffset ?? 0;
  return { x, y };
};
