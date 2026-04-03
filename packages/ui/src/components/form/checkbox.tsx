"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
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
      value: valueProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const inputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

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
          <CheckboxPrimitive.Root
            id={inputId}
            inputRef={inputRef}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onCheckedChange={(next) => onCheckedChange?.(next)}
            value={
              typeof valueProp === "string"
                ? valueProp
                : valueProp === undefined
                  ? undefined
                  : String(valueProp)
            }
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded border border-border bg-background transition-colors outline-none",
              "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "data-disabled:cursor-not-allowed",
              "data-checked:border-brand data-checked:bg-brand data-checked:[&_svg]:opacity-100",
            )}
            {...(props as Omit<
              React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
              | "id"
              | "inputRef"
              | "checked"
              | "defaultChecked"
              | "disabled"
              | "onCheckedChange"
              | "value"
              | "className"
            >)}
          >
            <CheckboxPrimitive.Indicator
              keepMounted
              className="flex items-center justify-center text-background [&_svg]:opacity-0 data-checked:[&_svg]:opacity-100"
            >
              <svg
                className="h-3 w-3 transition-opacity"
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
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </span>
        <span className="text-sm text-foreground">{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
