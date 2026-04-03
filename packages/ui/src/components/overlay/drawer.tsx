"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const drawerPanelVariants = cva(
  "fixed z-[101] border-border bg-background p-6 text-foreground shadow-xl",
  {
    variants: {
      side: {
        left: "bottom-0 left-0 top-0 w-full max-w-sm border-r",
        right: "bottom-0 right-0 top-0 w-full max-w-sm border-l",
        top: "left-0 right-0 top-0 max-h-[85vh] border-b",
        bottom: "bottom-0 left-0 right-0 max-h-[85vh] border-t",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

const slideClass: Record<NonNullable<VariantProps<typeof drawerPanelVariants>["side"]>, string> = {
  left: "-translate-x-full data-[open]:translate-x-0",
  right: "translate-x-full data-[open]:translate-x-0",
  top: "-translate-y-full data-[open]:translate-y-0",
  bottom: "translate-y-full data-[open]:translate-y-0",
};

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof drawerPanelVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Drawer({
  open,
  onOpenChange,
  side = "right",
  children,
  className,
  ...props
}: DrawerProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open || !mounted || typeof document === "undefined") {
    return null;
  }

  const s = side ?? "right";

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close drawer"
        className="absolute inset-0 bg-background-inverse/40 backdrop-blur-[1px]"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        data-open=""
        className={cn(
          drawerPanelVariants({ side: s }),
          "transform transition-transform duration-300 ease-out motion-reduce:transition-none",
          slideClass[s],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
Drawer.displayName = "Drawer";
