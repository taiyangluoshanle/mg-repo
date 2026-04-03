"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
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

const DEFAULT_DELAY_MS = 400;

const TooltipShowArrowContext = React.createContext(false);

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
  return (
    <TooltipPrimitive.Provider delay={delayDuration} closeDelay={0}>
      <TooltipShowArrowContext.Provider value={showArrow}>
        <TooltipPrimitive.Root
          defaultOpen={defaultOpen}
          open={openProp}
          onOpenChange={(open: boolean) => onOpenChange?.(open)}
        >
          <span className="relative inline-flex">{children}</span>
        </TooltipPrimitive.Root>
      </TooltipShowArrowContext.Provider>
    </TooltipPrimitive.Provider>
  );
}
Tooltip.displayName = "Tooltip";

export const TooltipTrigger = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    render={(triggerProps: React.ComponentPropsWithRef<"span">) => (
      <span
        {...props}
        {...triggerProps}
        ref={mergeRefs(ref, triggerProps.ref)}
        className={cn("inline-flex", className, triggerProps.className)}
      >
        {children}
      </span>
    )}
  />
));
TooltipTrigger.displayName = "TooltipTrigger";

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showArrow?: boolean;
}

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(({ className, showArrow: showArrowProp, children, ...props }, ref) => {
  const ctxArrow = React.useContext(TooltipShowArrowContext);
  const showArrow = showArrowProp ?? ctxArrow;

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side="bottom"
        align="center"
        sideOffset={8}
        className="z-50"
      >
        <TooltipPrimitive.Popup
          ref={ref}
          className={cn(
            "whitespace-nowrap rounded-md border border-border bg-foreground px-2 py-1 text-xs text-background shadow-md transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
          {showArrow ? (
            <TooltipPrimitive.Arrow
              className={cn(
                "h-2 w-2 border-l border-t border-border bg-foreground fill-foreground",
              )}
            />
          ) : null}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = "TooltipContent";
