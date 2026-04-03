"use client";

import * as React from "react";
import { cn } from "@mg/utils";

function assignRef<T>(
  ref: React.Ref<T> | undefined,
  value: T | null,
): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref != null) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

interface PopoverContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contentId: string;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopover(component: string): PopoverContextValue {
  const ctx = React.useContext(PopoverContext);
  if (ctx == null) {
    throw new Error(`${component} must be used within Popover`);
  }
  return ctx;
}

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
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolled;

  const setOpen = React.useCallback(
    (v: React.SetStateAction<boolean>) => {
      const current = isControlled ? (openProp as boolean) : uncontrolled;
      const next = typeof v === "function" ? v(current) : v;
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, openProp, uncontrolled, onOpenChange],
  );

  const contentId = React.useId();

  const value = React.useMemo(
    () => ({ open, setOpen, contentId }),
    [open, setOpen, contentId],
  );

  return (
    <PopoverContext.Provider value={value}>
      <div className="relative inline-block text-left">{children}</div>
    </PopoverContext.Provider>
  );
}
Popover.displayName = "Popover";

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", onClick, ...props }, ref) => {
  const { open, setOpen, contentId } = usePopover("PopoverTrigger");
  return (
    <button
      ref={ref}
      type={type}
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setOpen((o) => !o);
      }}
      {...props}
    />
  );
});
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open, contentId, setOpen } = usePopover("PopoverContent");
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open || container == null) return;
    const onDoc = (e: MouseEvent) => {
      if (!container.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, container, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={(node) => {
        setContainer(node);
        assignRef(ref, node);
      }}
      id={contentId}
      role="dialog"
      className={cn(
        "absolute left-0 top-full z-50 mt-1 w-72 rounded-md border border-border bg-background p-4 text-foreground shadow-md animate-scale-in",
        className,
      )}
      {...props}
    />
  );
});
PopoverContent.displayName = "PopoverContent";
