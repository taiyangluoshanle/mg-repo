export type FormatPercentOptions = {
  /** BCP 47 locale (default `zh-CN`) */
  locale?: string;
  /** Number of fraction digits (default `0`, max `20`) */
  decimals?: number;
};

/** Format a ratio (e.g. 0.25 → 25%) as a localized percentage string */
export const formatPercent = (
  value: number,
  options: FormatPercentOptions = {}
): string => {
  if (!Number.isFinite(value)) return "";

  const locale = options.locale ?? "zh-CN";
  const decimals = options.decimals ?? 0;

  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) {
    return new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 20,
    }).format(value);
  }

  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};
