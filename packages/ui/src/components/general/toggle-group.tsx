"use client";
import * as React from "react";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { cn } from "@mg/utils";

export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof BaseToggleGroup>;

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, ...props }, ref) => (
    <BaseToggleGroup
      ref={ref}
      className={cn("inline-flex items-center gap-1 rounded-lg bg-neutral-100 p-1", className)}
      {...props}
    />
  ),
);
ToggleGroup.displayName = "ToggleGroup";
