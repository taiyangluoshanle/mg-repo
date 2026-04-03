"use client";

import { ToastProvider, Button, useToast } from "@mg/ui";

const ToastTrigger = () => {
  const { toast } = useToast();
  return (
    <Button
      size="sm"
      variant="primary"
      onClick={() =>
        toast({
          title: "已保存",
          description: "您的更改已同步。",
          variant: "success",
          duration: 4000,
        })
      }
    >
      显示 Toast
    </Button>
  );
};

export const ToastBasicDemo = () => {
  return (
    <ToastProvider>
      <div className="flex items-center gap-3">
        <ToastTrigger />
      </div>
    </ToastProvider>
  );
};
