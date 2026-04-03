"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@mg/ui";

export const DialogBasicDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>对话框标题</DialogTitle>
          <DialogDescription>这是一段描述文字。</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>
            确认
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
