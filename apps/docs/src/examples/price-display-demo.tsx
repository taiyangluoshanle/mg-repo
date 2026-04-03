"use client";

import { PriceDisplay } from "@mg/ui-commerce";

export const PriceDisplayBasicDemo = () => {
  return (
    <div className="flex flex-col gap-4">
      <PriceDisplay original={299} current={199} currency="¥" />
      <PriceDisplay current={59} currency="¥" />
    </div>
  );
};
