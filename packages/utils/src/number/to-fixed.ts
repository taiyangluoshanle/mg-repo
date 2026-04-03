/** Format a number with fixed fraction digits, mitigating common float rounding glitches */
export const toFixed = (value: number, digits: number): string => {
  if (!Number.isFinite(value)) return "";
  if (!Number.isInteger(digits) || digits < 0 || digits > 100) return String(value);

  if (digits === 0) return String(Math.round(value));

  const pow = 10 ** digits;
  const rounded =
    Math.round(parseFloat((Math.abs(value) * pow).toPrecision(15))) / pow;
  const signed = value < 0 ? -rounded : rounded;
  return signed.toFixed(digits);
};
