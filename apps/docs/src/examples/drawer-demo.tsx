"use client";

import { useState } from "react";
import { Button, Drawer } from "@mg/ui";

export const DrawerBasicDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        打开抽屉
      </Button>
      <Drawer open={open} onOpenChange={setOpen} side="right">
        <div className="p-6">
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--neutral-50)" }}
          >
            抽屉内容
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--neutral-400)" }}>
            这是抽屉的内容区域。
          </p>
        </div>
      </Drawer>
    </>
  );
};
