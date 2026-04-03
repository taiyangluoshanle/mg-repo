"use client";

import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import * as React from "react";
import { cn } from "@mg/utils";

export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
};

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      value: valueProp,
      defaultValue,
      onValueChange,
      name: nameProp,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const autoName = React.useId();
    const name = nameProp ?? `radio-group-${autoName}`;

    return (
      <RadioGroupPrimitive
        ref={ref}
        name={name}
        value={valueProp}
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={(next) => onValueChange?.(String(next))}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export type RadioItemProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "size"
> & {
  value: string;
  label: string;
};

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({ className, id, value, label, disabled, ...props }, ref) => {
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
          "has-disabled:cursor-not-allowed has-disabled:opacity-50",
          className,
        )}
      >
        <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
          <RadioPrimitive.Root
            id={inputId}
            value={value}
            disabled={disabled}
            inputRef={inputRef}
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background transition-colors outline-none",
              "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "data-checked:border-brand",
            )}
            {...(props as Omit<
              React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>,
              "id" | "value" | "disabled" | "inputRef" | "className"
            >)}
          >
            <RadioPrimitive.Indicator
              keepMounted
              className="flex items-center justify-center [&_span]:scale-0 data-checked:[&_span]:scale-100"
            >
              <span className="h-2 w-2 rounded-full bg-brand transition-transform" />
            </RadioPrimitive.Indicator>
          </RadioPrimitive.Root>
        </span>
        <span className="text-sm text-foreground">{label}</span>
      </label>
    );
  },
);

RadioItem.displayName = "RadioItem";

export { RadioGroup, RadioItem };
