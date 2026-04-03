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

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contentId: string;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(
  null,
);

function useDropdownMenu(component: string): DropdownMenuContextValue {
  const ctx = React.useContext(DropdownMenuContext);
  if (ctx == null) {
    throw new Error(`${component} must be used within DropdownMenu`);
  }
  return ctx;
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
    <DropdownMenuContext.Provider value={value}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
}
DropdownMenu.displayName = "DropdownMenu";

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", onClick, ...props }, ref) => {
  const { open, setOpen, contentId } = useDropdownMenu("DropdownMenuTrigger");
  return (
    <button
      ref={ref}
      type={type}
      aria-expanded={open}
      aria-haspopup="menu"
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
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open, contentId, setOpen } = useDropdownMenu("DropdownMenuContent");
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
      role="menu"
      className={cn(
        "absolute left-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-background p-1 text-foreground shadow-md animate-slide-down",
        className,
      )}
      {...props}
    />
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", onClick, ...props }, ref) => {
  const { setOpen } = useDropdownMenu("DropdownMenuItem");
  return (
    <button
      ref={ref}
      type={type}
      role="menuitem"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-surface-hover focus:bg-surface-hover",
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setOpen(false);
      }}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
