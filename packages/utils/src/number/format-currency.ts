export type FormatCurrencyOptions = {
  /** BCP 47 locale (default `zh-CN`) */
  locale?: string;
  /** ISO 4217 currency code (default `CNY`, displays as ¥ in zh-CN) */
  currency?: string;
  /** Fraction digits; when omitted, follows locale default for the currency */
  decimals?: number;
};

/** Format a number as currency using Intl (defaults: zh-CN, CNY / ¥) */
export const formatCurrency = (
  amount: number,
  options: FormatCurrencyOptions = {}
): string => {
  if (!Number.isFinite(amount)) return "";

  const locale = options.locale ?? "zh-CN";
  const currency = options.currency ?? "CNY";
  const decimals = options.decimals;

  const base = { style: "currency" as const, currency };

  if (
    decimals !== undefined &&
    Number.isInteger(decimals) &&
    decimals >= 0 &&
    decimals <= 20
  ) {
    return new Intl.NumberFormat(locale, {
      ...base,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  }

  return new Intl.NumberFormat(locale, base).format(amount);
};
