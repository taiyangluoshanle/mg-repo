"use client";

import { useState } from "react";
import { CartItem } from "@mg/ui-commerce";

export const CartItemBasicDemo = () => {
  const [qty, setQty] = useState(2);
  return (
    <CartItem
      image="https://picsum.photos/seed/cart1/80/80"
      title="示例商品名称"
      price={99}
      quantity={qty}
      sku="颜色：黑 / 尺码：M"
      onQuantityChange={setQty}
      onRemove={() => alert("已移除")}
    />
  );
};
