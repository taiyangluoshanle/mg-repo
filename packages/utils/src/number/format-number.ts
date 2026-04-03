export type FormatNumberOptions = {
  /** BCP 47 locale (default `zh-CN`) */
  locale?: string;
  /** Minimum fraction digits passed to Intl */
  minimumFractionDigits?: number;
  /** Maximum fraction digits passed to Intl */
  maximumFractionDigits?: number;
};

/** Format a number with grouping separators (e.g. thousands) for the given locale */
export const formatNumber = (
  value: number,
  options: FormatNumberOptions = {}
): string => {
  if (!Number.isFinite(value)) return "";

  const locale = options.locale ?? "zh-CN";
  const { minimumFractionDigits, maximumFractionDigits } = options;

  if (
    minimumFractionDigits !== undefined &&
    (!Number.isInteger(minimumFractionDigits) ||
      minimumFractionDigits < 0 ||
      minimumFractionDigits > 20)
  ) {
    return new Intl.NumberFormat(locale).format(value);
  }

  if (
    maximumFractionDigits !== undefined &&
    (!Number.isInteger(maximumFractionDigits) ||
      maximumFractionDigits < 0 ||
      maximumFractionDigits > 20)
  ) {
    return new Intl.NumberFormat(locale).format(value);
  }

  if (minimumFractionDigits !== undefined && maximumFractionDigits !== undefined) {
    if (minimumFractionDigits > maximumFractionDigits) {
      return new Intl.NumberFormat(locale).format(value);
    }
  }

  return new Intl.NumberFormat(locale, {
    ...(minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}),
    ...(maximumFractionDigits !== undefined ? { maximumFractionDigits } : {}),
  }).format(value);
};
