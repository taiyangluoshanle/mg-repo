import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Separator, Text } from "@mg/ui";
import { formatPriceAmount } from "../../lib/format-price";

export interface CartSummaryProps extends HTMLAttributes<HTMLDivElement> {
  subtotal: number;
  shipping: number | "free";
  discount?: number;
  total: number;
}

export const CartSummary = forwardRef<HTMLDivElement, CartSummaryProps>(
  ({ className, subtotal, shipping, discount, total, ...props }, ref) => {
    const currency = "¥";
    return (
      <div ref={ref} className={cn("flex flex-col gap-3 text-sm", className)} {...props}>
        <div className="flex justify-between gap-4">
          <Text as="span" className="text-foreground-secondary">
            商品小计
          </Text>
          <span className="tabular-nums">{formatPriceAmount(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <Text as="span" className="text-foreground-secondary">
            运费
          </Text>
          <span className="tabular-nums">
            {shipping === "free" ? "免运费" : formatPriceAmount(shipping, currency)}
          </span>
        </div>
        {discount !== undefined && discount > 0 ? (
          <div className="flex justify-between gap-4 text-destructive">
            <Text as="span">优惠</Text>
            <span className="tabular-nums">-{formatPriceAmount(discount, currency)}</span>
          </div>
        ) : null}
        <Separator />
        <div className="flex justify-between gap-4 text-base font-bold">
          <Text as="span">合计</Text>
          <span className="tabular-nums">{formatPriceAmount(total, currency)}</span>
        </div>
      </div>
    );
  },
);

CartSummary.displayName = "CartSummary";
