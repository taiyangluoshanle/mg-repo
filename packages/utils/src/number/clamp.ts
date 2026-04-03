/** Clamp a number to an inclusive [min, max] range (swaps bounds if reversed) */
export const clamp = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value)) return Number.NaN;
  if (!Number.isFinite(min) || !Number.isFinite(max)) return value;

  let lo = min;
  let hi = max;
  if (lo > hi) {
    lo = max;
    hi = min;
  }

  if (value < lo) return lo;
  if (value > hi) return hi;
  return value;
};
