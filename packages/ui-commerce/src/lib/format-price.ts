import { formatCurrency } from "@mg/utils";

/** Map display symbols or ISO codes to Intl formatting */
export function formatPriceAmount(amount: number, currency: string): string {
  const trimmed = currency.trim();
  if (/^[A-Z]{3}$/i.test(trimmed)) {
    return formatCurrency(amount, { currency: trimmed.toUpperCase() });
  }
  const symbolToCode: Record<string, string> = {
    "¥": "CNY",
    "￥": "CNY",
    $: "USD",
    "€": "EUR",
    "£": "GBP",
  };
  const code = symbolToCode[trimmed];
  if (code) return formatCurrency(amount, { currency: code });
  return `${trimmed}${amount.toFixed(2)}`;
}
