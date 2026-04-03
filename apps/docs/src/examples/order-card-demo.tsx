"use client";

import { OrderCard } from "@mg/ui-commerce";

export const OrderCardBasicDemo = () => {
  return (
    <OrderCard
      orderNo="20260402120001"
      status="待发货"
      statusVariant="warning"
      items={[
        { image: "https://picsum.photos/seed/oc1/80/80", title: "商品 A", price: 59, quantity: 1 },
        { image: "https://picsum.photos/seed/oc2/80/80", title: "商品 B", price: 39, quantity: 2 },
      ]}
      total={137}
    />
  );
};
