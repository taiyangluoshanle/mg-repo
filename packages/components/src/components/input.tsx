"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@mg/utils";

const inputVariants = cva(
  [
    "peer w-full min-w-0 bg-transparent text-[#1d1d1f] transition-all",
    "placeholder:text-black/48 dark:placeholder:text-white/48",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "dark:text-white",
    "tracking-[-0.374px]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "rounded-[11px] border border-[#d2d2d7]",
          "bg-white dark:bg-[#1d1d1f] dark:border-[#424245]",
          "focus-visible:border-[#0071e3] focus-visible:ring-1 focus-visible:ring-[#0071e3]",
        ].join(" "),
        search: [
          "rounded-[11px] border-[3px] border-black/[0.04]",
          "bg-[#fafafc] dark:bg-[#272729] dark:border-white/[0.04]",
          "focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#0071e3]",
        ].join(" "),
        underline: [
          "rounded-none border-b border-[#d2d2d7] dark:border-[#424245]",
          "bg-transparent",
          "focus-visible:border-[#0071e3]",
        ].join(" "),
      },
      size: {
        sm: "h-[36px] px-[12px] py-[6px] text-[14px] leading-[1.29]",
        md: "h-[44px] px-[14px] py-[8px] text-[17px] leading-[1.47]",
        lg: "h-[52px] px-[16px] py-[10px] text-[21px] leading-[1.19]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "size"> &
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
      sm: { start: "pl-[32px]", end: "pr-[32px]", icon: "text-[14px]" },
      md: { start: "pl-[40px]", end: "pr-[40px]", icon: "text-[17px]" },
      lg: { start: "pl-[46px]", end: "pr-[46px]", icon: "text-[21px]" },
    } as const;

    const s = size ?? "md";

    return (
      <div className="relative w-full">
        {startAdornment ? (
          <span
            className={cn(
              "pointer-events-none absolute left-[14px] top-1/2 z-[1] -translate-y-1/2 text-black/48 dark:text-white/48",
              sizePad[s].icon,
            )}
            aria-hidden="true"
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
              "pointer-events-none absolute right-[14px] top-1/2 z-[1] -translate-y-1/2 text-black/48 dark:text-white/48",
              sizePad[s].icon,
            )}
            aria-hidden="true"
          >
            {endAdornment}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants, type InputProps };
