"use client";

import { AspectRatio } from "@mg/ui";

export const AspectRatioBasicDemo = () => {
  return (
    <div className="w-full max-w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-lg text-sm font-medium" style={{ background: "rgba(41,151,255,0.1)", color: "#2997ff" }}>
          16 : 9
        </div>
      </AspectRatio>
    </div>
  );
};
