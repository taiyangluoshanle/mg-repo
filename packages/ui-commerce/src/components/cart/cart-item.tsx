import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Button, Text } from "@mg/ui";
import { formatPriceAmount } from "../../lib/format-price";
import { QuantityStepper } from "../product/quantity-stepper";

export interface CartItemProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  price: number;
  quantity: number;
  sku: string;
  onQuantityChange: (next: number) => void;
  onRemove: () => void;
}

export const CartItem = forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      className,
      image,
      title,
      price,
      quantity,
      sku,
      onQuantityChange,
      onRemove,
      ...props
    },
    ref,
  ) => {
    const line = price * quantity;

    return (
      <div ref={ref} className={cn("flex gap-3 py-3", className)} {...props}>
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-background-secondary">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <Text as="span" className="line-clamp-2 text-sm font-medium leading-snug">
              {title}
            </Text>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 shrink-0 text-destructive hover:text-destructive"
              onClick={onRemove}
            >
              删除
            </Button>
          </div>
          <Text as="span" className="text-xs text-foreground-muted">
            {sku}
          </Text>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <QuantityStepper value={quantity} onValueChange={onQuantityChange} />
            <div className="text-right">
              <Text as="span" className="text-sm font-semibold tabular-nums">
                {formatPriceAmount(line, "¥")}
              </Text>
              <Text as="span" className="ml-2 text-xs text-foreground-muted tabular-nums">
                {formatPriceAmount(price, "¥")} × {quantity}
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CartItem.displayName = "CartItem";
