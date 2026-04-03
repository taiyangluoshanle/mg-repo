"use client";

import { useState } from "react";
import { SkuSelector } from "@mg/ui-commerce";

export const SkuSelectorBasicDemo = () => {
  const [value, setValue] = useState<Record<string, string>>({
    颜色: "黑色",
    尺码: "M",
  });

  return (
    <SkuSelector
      options={[
        { name: "颜色", values: ["黑色", "白色", "深蓝"] },
        { name: "尺码", values: ["S", "M", "L", "XL"] },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};
