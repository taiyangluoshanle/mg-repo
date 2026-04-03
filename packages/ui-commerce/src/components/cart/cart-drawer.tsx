"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@mg/utils";
import { Drawer } from "@mg/ui";

export interface CartDrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const CartDrawer = forwardRef<HTMLDivElement, CartDrawerProps>(
  ({ className, open, onOpenChange, children, ...props }, ref) => {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} side="right" className={cn("flex max-w-md flex-col", className)} {...props}>
        <div ref={ref} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </Drawer>
    );
  },
);

CartDrawer.displayName = "CartDrawer";
