"use client";

import { CartSummary } from "@mg/ui-commerce";

export const CartSummaryBasicDemo = () => {
  return (
    <div className="max-w-sm">
      <CartSummary subtotal={297} shipping="free" discount={20} total={277} />
    </div>
  );
};
