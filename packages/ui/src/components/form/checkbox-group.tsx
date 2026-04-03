"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import * as React from "react";
import { cn } from "@mg/utils";

export type CheckboxGroupProps = React.ComponentPropsWithoutRef<typeof CheckboxGroup>;
export const CheckboxGroupRoot = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, ...props }, ref) => (
    <CheckboxGroup ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
  ),
);
CheckboxGroupRoot.displayName = "CheckboxGroupRoot";
