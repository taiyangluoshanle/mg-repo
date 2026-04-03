import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Badge, Card, CardContent, CardFooter, CardHeader, Separator, Text } from "@mg/ui";
import { formatPriceAmount } from "../../lib/format-price";

export type OrderCardStatusVariant = "success" | "warning" | "error" | "default";

export interface OrderCardItem {
  image: string;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderCardProps extends HTMLAttributes<HTMLDivElement> {
  orderNo: string;
  status: string;
  statusVariant: OrderCardStatusVariant;
  items: OrderCardItem[];
  total: number;
}

const variantMap: Record<OrderCardStatusVariant, "success" | "warning" | "error" | "secondary"> = {
  success: "success",
  warning: "warning",
  error: "error",
  default: "secondary",
};

export const OrderCard = forwardRef<HTMLDivElement, OrderCardProps>(
  ({ className, orderNo, status, statusVariant, items, total, ...props }, ref) => {
    const currency = "¥";
    return (
      <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0 py-4">
          <Text as="span" className="text-sm font-medium">
            订单号 {orderNo}
          </Text>
          <Badge variant={variantMap[statusVariant]} size="sm">
            {status}
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pb-4 pt-0">
          {items.map((item, i) => (
            <div key={`${item.title}-${i}`}>
              {i > 0 ? <Separator className="mb-3" /> : null}
              <div className="flex gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-background-secondary">
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Text as="span" className="line-clamp-2 text-sm font-medium">
                    {item.title}
                  </Text>
                  <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-foreground-secondary">
                    <span className="tabular-nums">{formatPriceAmount(item.price, currency)}</span>
                    <span>× {item.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end border-t bg-background-secondary/40 py-3">
          <Text as="span" className="text-sm font-semibold">
            合计{" "}
            <span className="tabular-nums text-brand">{formatPriceAmount(total, currency)}</span>
          </Text>
        </CardFooter>
      </Card>
    );
  },
);

OrderCard.displayName = "OrderCard";
