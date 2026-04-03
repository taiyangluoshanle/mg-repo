"use client";

import { OrderStatus } from "@mg/ui-commerce";

export const OrderStatusBasicDemo = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <OrderStatus status="pending" />
      <OrderStatus status="paid" />
      <OrderStatus status="shipped" />
      <OrderStatus status="delivered" />
      <OrderStatus status="cancelled" />
    </div>
  );
};
