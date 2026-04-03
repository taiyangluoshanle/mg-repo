/**
 * Returns whether any part of the element intersects the visible viewport using `getBoundingClientRect`.
 */
export const isInViewport = (el: Element): boolean => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  if (!(el instanceof Element)) {
    return false;
  }

  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    return false;
  }

  const vh =
    window.innerHeight ?? document.documentElement.clientHeight ?? 0;
  const vw = window.innerWidth ?? document.documentElement.clientWidth ?? 0;

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < vh &&
    rect.left < vw
  );
};
