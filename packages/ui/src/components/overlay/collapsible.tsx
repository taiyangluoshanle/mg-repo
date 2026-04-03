"use client";
import * as React from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { cn } from "@mg/utils";

export interface CollapsibleRootProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Root> {}

export const CollapsibleRoot = React.forwardRef<HTMLDivElement, CollapsibleRootProps>(
  ({ className, ...props }, ref) => (
    <Collapsible.Root ref={ref} className={cn("w-full", className)} {...props} />
  ),
);
CollapsibleRoot.displayName = "CollapsibleRoot";

export const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Collapsible.Trigger>
>(({ className, ...props }, ref) => (
  <Collapsible.Trigger
    ref={ref}
    className={cn(
      "group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
      "hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-blue-600",
      className,
    )}
    {...props}
  />
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsiblePanel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Collapsible.Panel>
>(({ className, ...props }, ref) => (
  <Collapsible.Panel
    ref={ref}
    className={cn(
      "h-[var(--collapsible-panel-height)] overflow-hidden text-sm transition-[height] ease-out",
      "data-[ending-style]:h-0 data-[starting-style]:h-0",
      className,
    )}
    {...props}
  />
));
CollapsiblePanel.displayName = "CollapsiblePanel";
