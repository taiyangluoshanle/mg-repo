"use client";

import * as React from "react";
import { cn } from "@mg/utils";

export type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "onChange"
> & {
  label: string;
  onCheckedChange?: (checked: boolean) => void;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      id,
      label,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex cursor-pointer items-start gap-2",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={(e) => {
              onCheckedChange?.(e.target.checked);
            }}
            {...props}
          />
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded border border-border bg-background transition-colors",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
              "peer-disabled:cursor-not-allowed",
              "peer-checked:border-brand peer-checked:bg-brand peer-checked:[&_svg]:opacity-100",
            )}
            aria-hidden
          >
            <svg
              className="h-3 w-3 text-background opacity-0 transition-opacity"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        <span className="text-sm text-foreground">{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
