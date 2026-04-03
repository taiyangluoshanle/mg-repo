"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@mg/utils";

export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({
  open,
  onOpenChange,
  children,
  className,
  ...props
}: SheetProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={(nextOpen) => onOpenChange(nextOpen)}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-[100] bg-background-inverse/40 backdrop-blur-[1px] transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <BaseDialog.Popup
          className={cn(
            "fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh] overflow-y-auto rounded-t-xl border border-border border-b-0 bg-background p-6 text-foreground shadow-xl transition-[opacity,transform] duration-300 data-[starting-style]:translate-y-full data-[starting-style]:opacity-0 data-[ending-style]:translate-y-full data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
Sheet.displayName = "Sheet";
