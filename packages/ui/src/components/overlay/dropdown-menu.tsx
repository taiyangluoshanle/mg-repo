"use client";

import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { cn } from "@mg/utils";

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    }
  };
}

export interface DropdownMenuProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
}: DropdownMenuProps) {
  return (
    <Menu.Root
      defaultOpen={defaultOpen}
      open={openProp}
      onOpenChange={(open) => onOpenChange?.(open)}
      modal={false}
    >
      <div className="relative inline-block text-left">{children}</div>
    </Menu.Root>
  );
}
DropdownMenu.displayName = "DropdownMenu";

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", ...props }, ref) => (
  <Menu.Trigger
    ref={ref}
    type={type}
    className={cn(className)}
    {...props}
  />
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Menu.Portal>
    <Menu.Positioner side="bottom" align="start" sideOffset={4} className="z-50">
      <Menu.Popup
        ref={ref}
        className={cn(
          "min-w-[10rem] rounded-md border border-border bg-background p-1 text-foreground shadow-md transition-[opacity,transform] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className,
        )}
        {...props}
      />
    </Menu.Positioner>
  </Menu.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", ...props }, ref) => (
  <Menu.Item
    nativeButton
    render={(itemProps) => (
      <button
        type={type}
        {...props}
        {...itemProps}
        ref={mergeRefs(ref, itemProps.ref)}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-surface-hover focus:bg-surface-hover",
          className,
          itemProps.className,
        )}
      />
    )}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Menu.Separator
    ref={ref}
    orientation="horizontal"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
