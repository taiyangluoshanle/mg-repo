"use client";

import { PriceRange } from "@mg/ui-commerce";

export const PriceRangeBasicDemo = () => {
  return (
    <div className="flex flex-col gap-3">
      <PriceRange min={49} max={199} currency="¥" />
      <PriceRange min={99} max={99} currency="¥" />
    </div>
  );
};
