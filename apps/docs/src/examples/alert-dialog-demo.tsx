"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@mg/ui";

export const AlertDialogBasicDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        打开确认弹窗
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="确认删除"
        description="此操作不可撤销，确定要删除吗？"
        confirmText="删除"
        cancelText="取消"
        variant="destructive"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
};
