"use client";

import { ScrollArea } from "@mg/ui";

export const ScrollAreaBasicDemo = () => {
  return (
    <ScrollArea className="h-[150px] w-full max-w-sm rounded-lg border" style={{ borderColor: "var(--neutral-700)" }}>
      <div className="p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="py-1 text-sm" style={{ color: "var(--neutral-300)" }}>
            第 {i + 1} 行内容
          </p>
        ))}
      </div>
    </ScrollArea>
  );
};
