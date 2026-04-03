import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { formatPriceAmount } from "../../lib/format-price";

export interface PriceRangeProps extends HTMLAttributes<HTMLSpanElement> {
  min: number;
  max: number;
  currency: string;
}

export const PriceRange = forwardRef<HTMLSpanElement, PriceRangeProps>(
  ({ className, min, max, currency, ...props }, ref) => {
    const text =
      min === max
        ? formatPriceAmount(min, currency)
        : `${formatPriceAmount(min, currency)} - ${formatPriceAmount(max, currency)}`;

    return (
      <span ref={ref} className={cn("tabular-nums text-foreground", className)} {...props}>
        {text}
      </span>
    );
  },
);

PriceRange.displayName = "PriceRange";
