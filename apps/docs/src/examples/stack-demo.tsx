"use client";

import { HStack, VStack } from "@mg/ui";

export const StackBasicDemo = () => {
  const box = "flex h-10 w-10 items-center justify-center rounded-md text-xs font-medium";
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs" style={{ color: "var(--neutral-400)" }}>HStack</p>
        <HStack gap={3}>
          <div className={box} style={{ background: "var(--brand)", color: "#fff" }}>1</div>
          <div className={box} style={{ background: "var(--brand)", color: "#fff" }}>2</div>
          <div className={box} style={{ background: "var(--brand)", color: "#fff" }}>3</div>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-xs" style={{ color: "var(--neutral-400)" }}>VStack</p>
        <VStack gap={3}>
          <div className={box} style={{ background: "var(--brand)", color: "#fff" }}>1</div>
          <div className={box} style={{ background: "var(--brand)", color: "#fff" }}>2</div>
        </VStack>
      </div>
    </div>
  );
};
