"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@mg/utils";

const inputVariants = cva(
  "peer w-full min-w-0 rounded-md border bg-background text-foreground transition-colors placeholder:text-foreground-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50",
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

export type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      startAdornment,
      endAdornment,
      disabled,
      ...props
    },
    ref,
  ) => {
    const hasAdornment = Boolean(startAdornment) || Boolean(endAdornment);

    if (!hasAdornment) {
      return (
        <BaseInput
          ref={ref}
          disabled={disabled}
          className={cn(inputVariants({ variant, size }), className)}
          {...props}
        />
      );
    }

    const sizePad = {
      sm: { start: "pl-8", end: "pr-8" },
      md: { start: "pl-9", end: "pr-9" },
      lg: { start: "pl-11", end: "pr-11" },
    } as const;

    const s = size ?? "md";

    return (
      <div className="relative w-full">
        {startAdornment ? (
          <span
            className={cn(
              "pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 text-foreground-muted",
              s === "lg" && "left-3",
            )}
            aria-hidden
          >
            {startAdornment}
          </span>
        ) : null}
        <BaseInput
          ref={ref}
          disabled={disabled}
          className={cn(
            inputVariants({ variant, size }),
            startAdornment && sizePad[s].start,
            endAdornment && sizePad[s].end,
            className,
          )}
          {...props}
        />
        {endAdornment ? (
          <span
            className={cn(
              "pointer-events-none absolute right-2.5 top-1/2 z-[1] -translate-y-1/2 text-foreground-muted",
              s === "lg" && "right-3",
            )}
            aria-hidden
          >
            {endAdornment}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
