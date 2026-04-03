"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@mg/utils";

export interface PopoverProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root
      defaultOpen={defaultOpen}
      open={openProp}
      onOpenChange={(open: boolean) => onOpenChange?.(open)}
    >
      <div className="relative inline-block text-left">{children}</div>
    </PopoverPrimitive.Root>
  );
}
Popover.displayName = "Popover";

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    type={type}
    className={cn(className)}
    {...props}
  />
));
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner side="bottom" align="start" sideOffset={4} className="z-50">
      <PopoverPrimitive.Popup
        ref={ref}
        className={cn(
          "w-72 rounded-md border border-border bg-background p-4 text-foreground shadow-md transition-[opacity,transform] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";
