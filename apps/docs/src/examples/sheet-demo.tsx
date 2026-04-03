"use client";

import { useState } from "react";
import { Button, Sheet } from "@mg/ui";

export const SheetBasicDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        打开底部面板
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="p-6 text-center">
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--neutral-50)" }}
          >
            底部面板
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--neutral-400)" }}>
            这是底部面板内容。
          </p>
        </div>
      </Sheet>
    </>
  );
};
