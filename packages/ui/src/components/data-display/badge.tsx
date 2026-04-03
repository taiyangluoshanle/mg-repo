import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@mg/utils";

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-background-secondary text-foreground border",
        secondary:
          "border-transparent bg-background text-foreground-secondary border border-border",
        success:
          "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
        warning:
          "border-transparent bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20",
        error:
          "border-transparent bg-destructive/10 text-destructive border border-destructive/20",
        outline:
          "border-border bg-background text-foreground border",
      },
      size: {
        sm: "rounded-md px-2 py-0.5 text-xs",
        md: "rounded-md px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
