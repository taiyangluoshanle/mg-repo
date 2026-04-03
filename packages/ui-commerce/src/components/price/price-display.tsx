import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Badge, Text } from "@mg/ui";
import { formatPriceAmount } from "../../lib/format-price";

export interface PriceDisplayProps extends HTMLAttributes<HTMLDivElement> {
  original?: number;
  current: number;
  /** Display symbol (e.g. ¥) or ISO 4217 code */
  currency?: string;
}

export const PriceDisplay = forwardRef<HTMLDivElement, PriceDisplayProps>(
  ({ className, original, current, currency = "¥", ...props }, ref) => {
    const hasOriginal = original !== undefined && original > current;
    const discountPct =
      hasOriginal && original! > 0
        ? Math.round((1 - current / original!) * 100)
        : 0;

    return (
      <div ref={ref} className={cn("flex flex-wrap items-baseline gap-2", className)} {...props}>
        <span className="text-2xl font-bold text-destructive tabular-nums">
          {formatPriceAmount(current, currency)}
        </span>
        {hasOriginal ? (
          <>
            <Text as="span" className="text-sm text-foreground-muted line-through tabular-nums">
              {formatPriceAmount(original!, currency)}
            </Text>
            {discountPct > 0 ? (
              <Badge variant="error" size="sm">
                省 {discountPct}%
              </Badge>
            ) : null}
          </>
        ) : null}
      </div>
    );
  },
);

PriceDisplay.displayName = "PriceDisplay";
