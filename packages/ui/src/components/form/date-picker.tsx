import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@mg/utils";

const dateInputVariants = cva(
  "w-full min-w-0 rounded-md border bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70",
  {
    variants: {
      variant: {
        default: "border-border",
        error: "border-destructive focus-visible:ring-destructive",
      },
      size: {
        sm: "h-8 px-2.5 py-1 text-sm",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type DatePickerProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "size" | "type"
> &
  VariantProps<typeof dateInputVariants>;

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, variant, size, ...props }, ref) => (
    <input
      ref={ref}
      type="date"
      className={cn(dateInputVariants({ variant, size, className }))}
      {...props}
    />
  ),
);

DatePicker.displayName = "DatePicker";

export { DatePicker, dateInputVariants };
