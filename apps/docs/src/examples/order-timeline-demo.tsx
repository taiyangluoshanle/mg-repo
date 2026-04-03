"use client";

import { OrderTimeline } from "@mg/ui-commerce";

export const OrderTimelineBasicDemo = () => {
  return (
    <OrderTimeline
      events={[
        { time: "2026-04-02 10:00", title: "商家已发货", description: "承运商：顺丰速运" },
        { time: "2026-04-01 18:30", title: "仓库拣货完成" },
        { time: "2026-04-01 09:00", title: "订单已支付" },
      ]}
    />
  );
};
