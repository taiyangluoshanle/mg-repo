"use client";

import { Separator } from "@mg/ui";

export const SeparatorBasicDemo = () => {
  return (
    <div className="w-full max-w-md">
      <p className="text-sm" style={{ color: "var(--neutral-300)" }}>上方内容</p>
      <Separator className="my-4" />
      <p className="text-sm" style={{ color: "var(--neutral-300)" }}>下方内容</p>
    </div>
  );
};
