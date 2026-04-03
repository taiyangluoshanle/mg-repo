import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@mg/utils";

const textareaVariants = cva(
  "w-full min-w-0 rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors placeholder:text-foreground-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border",
        error: "border-destructive focus-visible:ring-destructive",
      },
      size: {
        sm: "min-h-[4.5rem] px-2.5 py-1.5 text-sm",
        md: "min-h-[5.5rem] px-3 py-2 text-sm",
        lg: "min-h-[6.5rem] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const resizeClass: Record<"none" | "vertical" | "horizontal" | "both", string> =
  {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  };

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> &
  VariantProps<typeof textareaVariants> & {
    resize?: "none" | "vertical" | "horizontal" | "both";
  };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, resize = "vertical", style, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        textareaVariants({ variant, size }),
        resizeClass[resize],
        className,
      )}
      style={style}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
