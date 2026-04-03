/**
 * Scrolls the window to a vertical pixel position or so that an element’s top aligns with the viewport, optionally with offset and scroll behavior.
 */
export const scrollTo = (
  target: Element | number,
  options?: { behavior?: ScrollBehavior; offset?: number },
): void => {
  if (typeof window === "undefined") {
    return;
  }

  const behavior = options?.behavior ?? "auto";
  const offset = options?.offset ?? 0;

  if (typeof target === "number") {
    if (!Number.isFinite(target)) {
      return;
    }
    const top = Math.max(0, target - offset);
    window.scrollTo({ top, left: window.scrollX, behavior });
    return;
  }

  if (!(target instanceof Element)) {
    return;
  }

  const rect = target.getBoundingClientRect();
  const top = window.scrollY + rect.top - offset;
  window.scrollTo({
    top: Math.max(0, top),
    left: window.scrollX,
    behavior,
  });
};
