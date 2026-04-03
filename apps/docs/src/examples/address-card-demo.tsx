"use client";

import { AddressCard } from "@mg/ui-commerce";

export const AddressCardBasicDemo = () => {
  return (
    <div className="max-w-sm">
      <AddressCard
        name="张三"
        phone="138****8000"
        address="上海市浦东新区示例路 1 号 XX 大厦 12 楼"
        isDefault
      />
    </div>
  );
};
