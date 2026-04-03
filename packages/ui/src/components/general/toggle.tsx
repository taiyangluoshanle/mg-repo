"use client";
import * as React from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-neutral-100 data-[pressed]:bg-neutral-200 data-[pressed]:text-neutral-900",
        outline: "border border-neutral-200 bg-transparent hover:bg-neutral-100 data-[pressed]:bg-neutral-100",
      },
      size: {
        sm: "h-8 px-2",
        md: "h-9 px-3",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export type ToggleProps = React.ComponentPropsWithoutRef<typeof BaseToggle> &
  VariantProps<typeof toggleVariants>;

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => (
    <BaseToggle
      ref={ref}
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Toggle.displayName = "Toggle";
export { toggleVariants };
