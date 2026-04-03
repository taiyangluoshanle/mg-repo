"use client";
import * as React from "react";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { cn } from "@mg/utils";

export type MenubarProps = React.ComponentPropsWithoutRef<typeof BaseMenubar>;

export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, ...props }, ref) => (
    <BaseMenubar ref={ref} className={cn("flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1", className)} {...props} />
  ),
);
Menubar.displayName = "Menubar";
