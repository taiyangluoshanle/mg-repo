/** Return a random integer between min and max (inclusive), or NaN if inputs are invalid */
export const randomInt = (min: number, max: number): number => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return Number.NaN;

  let lo = Math.ceil(min);
  let hi = Math.floor(max);
  if (lo > hi) {
    const t = lo;
    lo = hi;
    hi = t;
  }

  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
};
