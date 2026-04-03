import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@mg/utils";
import { Badge } from "@mg/ui";

export type OrderStatusValue = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface OrderStatusProps extends HTMLAttributes<HTMLSpanElement> {
  status: OrderStatusValue;
}

const label: Record<OrderStatusValue, string> = {
  pending: "待付款",
  paid: "已付款",
  shipped: "配送中",
  delivered: "已完成",
  cancelled: "已取消",
};

const badgeVariant: Record<OrderStatusValue, "warning" | "success" | "secondary" | "error"> = {
  pending: "warning",
  paid: "success",
  shipped: "secondary",
  delivered: "success",
  cancelled: "error",
};

export const OrderStatus = forwardRef<HTMLSpanElement, OrderStatusProps>(
  ({ className, status, ...props }, ref) => {
    return (
      <Badge ref={ref} variant={badgeVariant[status]} size="sm" className={cn(className)} {...props}>
        {label[status]}
      </Badge>
    );
  },
);

OrderStatus.displayName = "OrderStatus";
