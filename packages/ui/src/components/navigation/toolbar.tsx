"use client";
import * as React from "react";
import { Toolbar } from "@base-ui/react/toolbar";
import { cn } from "@mg/utils";

export type ToolbarRootProps = React.ComponentPropsWithoutRef<typeof Toolbar.Root>;
export const ToolbarRoot = React.forwardRef<HTMLDivElement, ToolbarRootProps>(
  ({ className, ...props }, ref) => (
    <Toolbar.Root ref={ref} className={cn("flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1", className)} {...props} />
  ),
);
ToolbarRoot.displayName = "ToolbarRoot";

export const ToolbarGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Toolbar.Group>>(
  ({ className, ...props }, ref) => (
    <Toolbar.Group ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
  ),
);
ToolbarGroup.displayName = "ToolbarGroup";

export const ToolbarButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Toolbar.Button>>(
  ({ className, ...props }, ref) => (
    <Toolbar.Button ref={ref} className={cn("inline-flex h-8 items-center justify-center rounded-md px-2 text-sm hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-50", className)} {...props} />
  ),
);
ToolbarButton.displayName = "ToolbarButton";

export const ToolbarLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<typeof Toolbar.Link>>(
  ({ className, ...props }, ref) => (
    <Toolbar.Link ref={ref} className={cn("inline-flex h-8 items-center justify-center rounded-md px-2 text-sm text-blue-600 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600", className)} {...props} />
  ),
);
ToolbarLink.displayName = "ToolbarLink";

export const ToolbarInput = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<typeof Toolbar.Input>>(
  ({ className, ...props }, ref) => (
    <Toolbar.Input ref={ref} className={cn("h-8 rounded-md border border-neutral-200 px-2 text-sm focus-visible:outline-2 focus-visible:outline-blue-600", className)} {...props} />
  ),
);
ToolbarInput.displayName = "ToolbarInput";

export const ToolbarSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Toolbar.Separator>>(
  ({ className, ...props }, ref) => (
    <Toolbar.Separator ref={ref} className={cn("mx-1 h-5 w-px bg-neutral-200", className)} {...props} />
  ),
);
ToolbarSeparator.displayName = "ToolbarSeparator";
