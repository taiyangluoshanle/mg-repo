"use client";

import { Fieldset } from "@base-ui/react/fieldset";
import * as React from "react";
import { cn } from "@mg/utils";

export type FieldsetRootProps = React.ComponentPropsWithoutRef<typeof Fieldset.Root>;
export const FieldsetRoot = React.forwardRef<HTMLElement, FieldsetRootProps>(
  ({ className, ...props }, ref) => (
    <Fieldset.Root
      ref={ref}
      className={cn("space-y-4 rounded-lg border border-neutral-200 p-4", className)}
      {...props}
    />
  ),
);
FieldsetRoot.displayName = "FieldsetRoot";

export const FieldsetLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Fieldset.Legend>
>(({ className, ...props }, ref) => (
  <Fieldset.Legend
    ref={ref}
    className={cn("px-1 text-sm font-medium text-neutral-700", className)}
    {...props}
  />
));
FieldsetLegend.displayName = "FieldsetLegend";
