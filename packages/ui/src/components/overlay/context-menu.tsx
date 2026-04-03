"use client";
import * as React from "react";
import { ContextMenu } from "@base-ui/react/context-menu";
import { cn } from "@mg/utils";

export type ContextMenuRootProps = React.ComponentPropsWithoutRef<typeof ContextMenu.Root>;
export const ContextMenuRoot = (props: ContextMenuRootProps) => (
  <ContextMenu.Root {...props} />
);
ContextMenuRoot.displayName = "ContextMenuRoot";

export const ContextMenuTrigger = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof ContextMenu.Trigger>>(
  ({ className, ...props }, ref) => (
    <ContextMenu.Trigger ref={ref} className={cn("", className)} {...props} />
  ),
);
ContextMenuTrigger.displayName = "ContextMenuTrigger";
