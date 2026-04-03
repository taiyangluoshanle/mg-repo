import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const progressTrackVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-background-tertiary",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const progressIndicatorVariants = cva(
  "h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-brand",
        success: "bg-success",
        error: "bg-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, variant, size, ...props }, ref) => {
    const clamped = Math.min(100, Math.max(0, value));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(progressTrackVariants({ size }), className)}
        {...props}
      >
        <div
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ width: `${clamped}%` }}
        />
      </div>
    );
  },
);
Progress.displayName = "Progress";
