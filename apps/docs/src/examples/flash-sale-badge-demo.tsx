"use client";

import { FlashSaleBadge } from "@mg/ui-commerce";

export const FlashSaleBadgeBasicDemo = () => {
  return (
    <div className="flex items-center gap-3">
      <FlashSaleBadge />
      <FlashSaleBadge text="闪购进行中" />
    </div>
  );
};
