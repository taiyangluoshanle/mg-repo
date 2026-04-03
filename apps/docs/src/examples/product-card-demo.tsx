"use client";

import { ProductCard } from "@mg/ui-commerce";

export const ProductCardBasicDemo = () => {
  return (
    <div className="max-w-[240px]">
      <ProductCard
        image="https://picsum.photos/seed/prod1/400/400"
        title="Apple AirPods Pro 2"
        price="¥1,799.00"
        tags={["新品", "包邮"]}
        onClick={() => alert("查看详情")}
      />
    </div>
  );
};
