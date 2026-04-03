"use client";

import { useState } from "react";
import { CartDrawer } from "@mg/ui-commerce";
import { Button } from "@mg/ui";

export const CartDrawerBasicDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开购物车</Button>
      <CartDrawer open={open} onOpenChange={setOpen}>
        <div className="p-4 text-sm text-neutral-600">购物车内容区域</div>
      </CartDrawer>
    </>
  );
};
