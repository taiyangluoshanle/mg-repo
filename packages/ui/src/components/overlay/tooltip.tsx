"use client";

import * as React from "react";
import { cn } from "@mg/utils";

const DEFAULT_DELAY_MS = 400;

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  delay: number;
  contentId: string;
  showArrow?: boolean;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltip(component: string): TooltipContextValue {
  const ctx = React.useContext(TooltipContext);
  if (ctx == null) {
    throw new Error(`${component} must be used within Tooltip`);
  }
  return ctx;
}

export interface TooltipProps {
  children: React.ReactNode;
  delayDuration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  showArrow?: boolean;
}

export function Tooltip({
  children,
  delayDuration = DEFAULT_DELAY_MS,
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  showArrow = false,
}: TooltipProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolled;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const contentId = React.useId();

  const value = React.useMemo(
    () => ({
      open,
      setOpen,
      delay: delayDuration,
      contentId,
      showArrow,
    }),
    [open, setOpen, delayDuration, contentId, showArrow],
  );

  return (
    <TooltipContext.Provider value={value}>
      <span className="relative inline-flex">{children}</span>
    </TooltipContext.Provider>
  );
}
Tooltip.displayName = "Tooltip";

export const TooltipTrigger = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
  const { setOpen, delay, contentId } = useTooltip("TooltipTrigger");
  const showTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = React.useCallback(() => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    showTimer.current = null;
    hideTimer.current = null;
  }, []);

  React.useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <span
      ref={ref}
      className={cn("inline-flex", className)}
      aria-describedby={contentId}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        clearTimers();
        showTimer.current = setTimeout(() => setOpen(true), delay);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        clearTimers();
        hideTimer.current = setTimeout(() => setOpen(false), 0);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        clearTimers();
        showTimer.current = setTimeout(() => setOpen(true), delay);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        clearTimers();
        setOpen(false);
      }}
      {...props}
    />
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showArrow?: boolean;
}

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(({ className, showArrow: showArrowProp, children, ...props }, ref) => {
  const { open, contentId, showArrow: ctxArrow } = useTooltip("TooltipContent");
  const showArrow = showArrowProp ?? ctxArrow ?? false;

  if (!open) return null;

  return (
    <div
      ref={ref}
      id={contentId}
      role="tooltip"
      className={cn(
        "absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-foreground px-2 py-1 text-xs text-background shadow-md animate-fade-in",
        className,
      )}
      {...props}
    >
      {children}
      {showArrow ? (
        <span
          className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-border bg-foreground"
          aria-hidden
        />
      ) : null}
    </div>
  );
});
TooltipContent.displayName = "TooltipContent";
